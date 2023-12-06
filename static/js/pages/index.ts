import PageView from "./page";
import data from "../data";

export default class IndexView extends PageView<{}> {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <section class="intro">
            <iframe src="https://www.youtube.com/embed/0Xi1SnC3aBQ?si=0bb8JMil5gKOC99N" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            <article>
                <p><i class="fa fa-envelope"></i> Email: <a href="mailto:artofphn@gmail.com">artofphn@gmail.com</a></p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vitae tincidunt arcu. Donec commodo ultricies rutrum. Donec pellentesque volutpat arcu, nec eleifend enim gravida ut. Maecenas sapien leo, commodo quis commodo eget, posuere vitae mi.</p>
                <p>Integer id volutpat nulla. Duis pulvinar sodales nisi, at semper eros. Etiam vitae enim molestie, hendrerit nisl et, tincidunt tellus. Praesent posuere placerat interdum. Pellentesque mollis sem eget vestibulum vehicula.</p>
            </article>
        </section>
        ${data.map(category =>
            `<section class="category" id="${category.name}">
                <h1>${category.name}</h1>
                ${category.description ? `<article>${category.description}</article>` : ``}
                <ul${category.cssVars ? ` style="${Object.keys(category.cssVars).map(k => `--${k}: ${category.cssVars[k]}`).join("; ")}"` : ``}>
                    ${category.items.map(item => {
                        const img = item.img[category.size ? category.size : "1000x300"];
                        return `<li style="--w: ${img.w}; --h: ${img.h}; --aspect-ratio: ${img.w} /${img.h}"><a data-lightbox href="${item.img["full"].filename}"><img src="${img.filename}" loading="lazy"></img><span>${item.name}</span></a></li>`
                    }).join("")}
                </ul>
            </section>`
        ).join("")}
        <section>
            <h1>Contact</h1>
            <p>artofphn@gmail.com</p>
        </section>`;
    }
}