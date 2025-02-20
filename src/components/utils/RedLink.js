import { redScreenLoader } from "redux/animationsSlice";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";

export default function RedLink({ className, children, link, img }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLink = (e) => {
    // Prevent link next
    e.preventDefault();
    if (router.pathname !== link) {
      // Disable scroll
      dispatch(redScreenLoader({ link, img }));
    }
  };

  return (
    <Link href={link.trim()} onClick={handleLink} className={className}>
      {children}
    </Link>
  );
}
