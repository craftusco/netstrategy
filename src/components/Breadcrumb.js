import Link from "next/link";
import { HCenteredContent, Paragraph } from "./styled-components";
import { useEffect, useState } from "react";

export function Breadcrumb(props) {
    const [color, setColor] = useState('#676767')

    useEffect(() => {
        if (props.isBlog) {
            setColor('#FC1532')
        }
    }, [])

    return (
        <HCenteredContent 
            marginTop={props.isSubpillar2 ? '55px' : '20px'}
            marginBottom={(props.isSubpillar2 == null) ? props.isBlog ? '-20px' : '-40px' : '10px'}
            mobile={(props.isSubpillar2 == null) ? props.isBlog ? 'margin-bottom: 20px;' : 'margin-bottom: -40px;' : 'margin-bottom: 0px; padding: 0px;'}
            style={{
                paddingLeft: 'clamp(1rem, calc(0.48rem + 2.2vw), 3.13rem)', 
                paddingRight: 'clamp(1rem, calc(0.48rem + 2.2vw), 3.13rem)', 
                justifyContent: 'start'
            }}
        >
            {props.links.map((el, i) => (
                (props.isSubpillar2 == null)
                ?
                    <Paragraph color={i == props.links.length - 1 ? '#FC1532' : color} fontSize="18px" key={i} style={(i == props.links.length - 1) ? {whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'} : {whiteSpace: 'nowrap'}} mobile="max-width: 190px;">
                        {
                            el.href ?
                            <Link style={{ margin: '0px 10px', textDecoration: 'underline' }} href={el.href}>
                                <span style={{textTransform: 'capitalize'}}>
                                    {
                                        (el.text != 'SEO' & el.text != 'SEM & ADV' & el.text != 'CRM') ? el.text.toLowerCase() : el.text
                                    }
                                </span>
                            </Link> :
                            <span style={{ margin: '0px 10px', textTransform: 'capitalize' }}>
                                {
                                    (el.text != 'SEO' && el.text != 'SEM & ADV' && el.text != 'CRM') ? ((i === 1) ? el.text.toLowerCase() : el.text) : el.text
                                }
                            </span>
                        }
                        
                        {i < props.links.length - 1 && <span>{' > '}</span>}
                    </Paragraph>
                :
                    <Paragraph fontSize="15px" key={i} style={(i == props.links.length - 1) ? {whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'} : {whiteSpace: 'nowrap'}} mobile="max-width: 190px; font-size: 11px !important; margin-top: 90px;">
                        {
                            el.href ?
                            <Link style={{ margin: '0px 10px', textDecoration: 'underline' }} href={el.href}>
                                <span style={{textTransform: 'uppercase'}}>
                                    {
                                        (el.text != 'SEO' & el.text != 'SEM & ADV' & el.text != 'CRM') ? el.text.toLowerCase() : el.text
                                    }
                                </span>
                            </Link> :
                            <span style={{ margin: '0px 10px', textTransform: 'uppercase', fontWeight: 'bold' }}>
                                {
                                    (el.text != 'SEO' && el.text != 'SEM & ADV' && el.text != 'CRM') ? el.text.toLowerCase() : el.text
                                }
                            </span>
                        }
                        
                        {i < props.links.length - 1 && <span>{' | '}</span>}
                    </Paragraph>
            ))}
        </HCenteredContent>
    )
}