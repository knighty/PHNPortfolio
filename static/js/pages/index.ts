import PageView from "./page";
import data from "../data";
import { escapeHtml, observeScopedEvent } from "../utils";
import { map } from "rxjs";

export default class IndexView extends PageView<{}> {
    constructor() {
        super();
    }

    connectedCallback() {
        //fromEvent(document, "ready")

        const logo = require("/static/images/logo.svg");

        observeScopedEvent(this, "load", "img", {
            capture: true
        }).pipe(
            map(([e, img]) => img)
        ).subscribe(img => {
            img.classList.add("loaded");
        });

        this.innerHTML = `
        <section class="intro">
            <aside class="video">
                <iframe src="${data.youtubeEmbed}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                <p><i class="fa fa-envelope"></i> Email: <a href="mailto:${data.email}">${data.email}</a></p>
            </aside>
            <article>
                <ul class="text-ticker">
                    <li>Illustrator</li>
                    <li>Designer</li>
                    <li>Animator</li>
                </ul>
            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 564.2 146.6" style="enable-background:new 0 0 564.2 146.6;" xml:space="preserve">
       <style type="text/css">
           .st0{fill:#FFFFFF;}
       </style>
       <path class="st0" d="M328.7,113.3v33.3h-11.2V57.2h78.4v56.1L328.7,113.3L328.7,113.3z M384.7,69l-56,0v32.4h56V69z"/>
       <path class="st0" d="M468.9,113.3V69h-56v44.3h-11.2V4.1h11.2v53.1h67.2v56.1L468.9,113.3L468.9,113.3z"/>
       <path class="st0" d="M564.2,57.2v56.1H553V69h-56v44.3h-11.2V57.2H564.2z"/>
       <g>
           <g>
               <polygon class="st0" points="65.2,49.3 65.2,69 84.9,49.3 		"/>
               <polygon class="st0" points="211.6,77.2 218,77.2 238.3,57.2 211.6,57.2 211.6,4.1 191.9,23.8 191.9,57.2 181.4,57.2 181.4,77.2 
                   191.9,77.2 191.9,113.2 211.6,113.2 		"/>
               <polygon class="st0" points="33.9,93.8 19.8,93.8 19.8,77.2 39.6,77.2 39.6,113.2 59.4,113.2 59.4,4.1 39.6,23.8 39.6,57.1 
                   19.7,57.2 0,77.2 0,113.2 33.9,113.2 		"/>
               <polygon class="st0" points="85,57.2 65.2,77.2 65.2,113.2 85,113.2 		"/>
               <polygon class="st0" points="175.6,57.2 155.9,77.2 155.9,113.2 175.6,113.2 		"/>
               <polygon class="st0" points="155.9,49.3 155.9,69 175.6,49.3 		"/>
               <polygon class="st0" points="110.5,77.2 130.3,77.2 130.3,126.9 110.6,126.9 90.9,146.6 90.9,146.6 130.3,146.6 150.2,126.9 
                   150.2,57.2 110.4,57.2 90.7,77.2 90.7,113.2 124.5,113.2 124.5,93.8 110.5,93.8 		"/>
           </g>
           <polygon class="st0" points="311.7,4.1 291.9,23.8 291.9,113.2 311.7,113.2 	"/>
           <g>
               <polygon class="st0" points="266.2,113.2 286.1,133.1 286.1,57.2 246.4,57.2 226.7,77.2 226.7,113.2 240.6,113.2 260.1,93.8 
                   246.3,93.8 246.3,77.2 266.2,77.2 		"/>
           </g>
       </g>
       </svg>
            </article>
        </section>
        ${data.categories.map(category =>
            `<section class="category" id="${category.name}" ${category.cssVars ? ` style="${Object.keys(category.cssVars).map(k => `--${k}: ${escapeHtml(category.cssVars[k])}`).join("; ")}"` : ``}>
                <div></div>
                <aside>
                    <h1>${category.name}</h1>
                    ${category.description ? `<article>${category.description}</article>` : ``}
                </aside>
                <ul${category.listCssVars ? ` style="${Object.keys(category.listCssVars).map(k => `--${k}: ${category.listCssVars[k]}`).join("; ")}"` : ``}>
                    ${category.items.map(item => {
                const img = item.img[category.size ? category.size : "1000x300"];
                return `<li style="--w: ${img.w}; --h: ${img.h}; --aspect-ratio: ${img.w} /${img.h}"><a data-lightbox href="${item.img["full"].filename}"><img src="${img.filename}" loading="lazy"></img><span>${item.name}</span></a></li>`
            }).join("")}
                </ul>
            </section>`
        ).join("")}
        <section class="category" id="motion-graphics">
            <aside>
                <h1>Motion Graphics</h1>
                <article><p>Video is a huge part of any modern company. Whether it be for TV, Youtube, or Social Media, having a motion graphics animator on your team can do wonders for spicing up your posts</p></article>
            </aside>
            <iframe src="${data.motionGraphicsEmbed}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </section>`;
    }
}