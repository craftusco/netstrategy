import getPath from "@/utils/getPath";

export default function mapImages(images) {
    if (!images || !images.data) return [];

    return images.data.map((el) => {
        return getPath(el.attributes.url) ;
    });
};