import StructuredDataInPage from "./StructuredDataInPage"

function PushStructureData(props) {
  return (
    <></>
    /*<script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
        __html: JSON.stringify(
          StructuredDataInPage(
            `https://netstrategy.it${props.router.asPath}`,
            props.page?.tag_title,
            props.page?.meta_description,
            props.page?.updatedAt,
            props.page,
            props.pillarData
            )
        ),
        }}
    ></script>*/
  )
}

export default PushStructureData