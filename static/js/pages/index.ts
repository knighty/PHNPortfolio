import PageView from "./page";
import data from "../data";
import { observeScopedEvent } from "../utils";
import { map } from "rxjs";

export default class IndexView extends PageView<{}> {
    constructor() {
        super();
    }

    connectedCallback() {
        //fromEvent(document, "ready")

        observeScopedEvent(this, "load", "img", {
            capture: true
        }).pipe(
            map(([e, img]) => img)
        ).subscribe(img => {
            img.classList.add("loaded");
        });

        this.innerHTML = `
        <section class="intro">
            <iframe src="${data.youtubeEmbed}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            <article>
                <p><i class="fa fa-envelope"></i> Email: <a href="mailto:${data.email}">${data.email}</a></p>
                ${data.intro}
            </article>
        </section>
        ${data.categories.map(category =>
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
            <p>${data.email}</p>
        </section>`;
    }
}