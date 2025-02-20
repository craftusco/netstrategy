import { useEffect, useState } from 'react';
import TagManager from 'react-gtm-module';
import { updateRoutes } from "../../redux/routesSlice";
import { useRouter } from "next/router";
import moment from 'moment';
import { useDispatch } from 'react-redux';

const tagManagerArgs = {
    gtmId: 'GTM-WR3W5N9B',
    dataLayer: {
        ns_uuid: "user_id", // salvato nei cookies - validità 30 giorni
        ns_usid: "session_id" // cambia una volta a sessione
    }
}

const TagManagerInitializer = ({pageName}) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [userId, setUserId] = useState(null);
    const [userSessionId, setUserSessionId] = useState(null);

    // TRACCIO PERCORSO UTENTE
    useEffect(() => {
        
        const time = moment().format('YYYY-MM-DD H:mm:ss');
        const pagePath = {
            path: router.asPath,
            time_start: time,
            time_end: null,
            page_type: pageName ? pageName : 'static', 
        };
        
        dispatch(updateRoutes({path: pagePath, time}));

    }, [router.asPath]);

    const createCookie = (name, value, days) => {
        var date, expires;
        if (days) {
            date = new Date();
            date.setDate(date.getDate() + days);
            expires = "; expires=" + date.toUTCString();
        } else {
            expires = "";
        }
        document.cookie = name + "=" + value + expires + "; path=/ ;secure";
    }

    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    useEffect(() => {
        if (document.cookie.indexOf('user_id') == -1)
            createCookie('user_id', `_${(new Date().valueOf() + Math.floor(Math.random() * (10000 - 1 + 1) + 1))}`, 30);

        if (document.cookie.indexOf('user_session_id') == -1)
            document.cookie = "user_session_id=_" + new Date().valueOf() + Math.floor(Math.random() * (10000 - 1 + 1) + 1) + ';secure';

        setUserId(getCookie('user_id'));
        setUserSessionId(getCookie('user_session_id'));
    }, []);

    useEffect(()=>{
        if(userId){
            tagManagerArgs.dataLayer.ns_uuid = userId;
            tagManagerArgs.dataLayer.ns_usid = userSessionId;
            tagManagerArgs.dataLayer.page_type = pageName ? pageName : 'static';
            TagManager.initialize(tagManagerArgs)
        }
    }, [userId])

    useEffect(() => {
        TagManager.dataLayer({ dataLayer: { 
            page_type: pageName ? pageName : 'static', 
            ns_usid: userId,
            ns_usid: userSessionId,
        }});
    }, [pageName]);

    return null;
};

export default TagManagerInitializer;