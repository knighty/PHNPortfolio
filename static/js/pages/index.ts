import PageView from "./page";
import data from "../data";
import { escapeHtml, observeMouseMove, observeMousePosition, observeScopedEvent } from "../utils";
import { animationFrames, combineLatest, combineLatestAll, distinctUntilChanged, map, merge, scan, tap, throttleTime } from "rxjs";

export default class IndexView extends PageView<{}> {
    constructor() {
        super();
    }

    connectedCallback() {
        //fromEvent(document, "ready")

        const logo = require("/static/images/logo.svg");

        /*observeMousePosition(this).pipe(throttleTime(30)).subscribe(e => {
            this.style.setProperty(`--gradient-x`, `${e.x}px`);
            this.style.setProperty(`--gradient-y`, `${e.y}px`);
        });*/

        /*animationFrames().subscribe(e => {
            const s = e.timestamp / 1000;
            const x = (0.5 + Math.sin(s) * 0.5) * window.outerWidth;
            const y = (0.5 + Math.cos(s) * 0.5) * window.outerHeight;
            this.style.setProperty(`--gradient-x`, `${x}px`);
            this.style.setProperty(`--gradient-y`, `${y}px`);
        });*/

        type State = {
            desired: number,
            lerp: number,
            velocity: number
        }

        /*merge(
            observeMousePosition(this).pipe(
                map(v => (state:State) => {
                    state.desired = v.y / window.innerHeight;
                    return state;
                })
            ),
            animationFrames().pipe(
                map(v => (state:State) => {
                    state.velocity += (state.desired - state.lerp) / 150;
                    state.lerp += state.velocity;
                    state.velocity *= 0.96;
                    return state;
                })
            )
        ).pipe(
            scan((state, fn, num) => fn(state), {
                desired: 0,
                lerp: 0,
                velocity: 0
            })
        ).subscribe(state => {
            (document.querySelector(".goo") as HTMLElement).style.setProperty(`--lerp`, `${1 - state.lerp}`);
            (document.querySelector(".goo") as HTMLElement).style.setProperty(`--width`, `-${1.5 - Math.abs(state.velocity) * 50}em`);
        });*/

        observeScopedEvent(this, "mousemove", "li").pipe(
            map(([e, element]) => {
                const rect = element.getBoundingClientRect();
                let nx = e.offsetX / rect.width - 0.5;
                let ny = e.offsetY / rect.height - 0.5;
                const radians = Math.atan2(ny, nx);
                const angle = Math.round(radians * 180 / Math.PI);
                const max = Math.max(Math.abs(nx), Math.abs(ny));
                const strength = Math.floor(Math.max(0, 0.3 - max) * 3 * 100) / 100;
                element.style.setProperty(`--hover-angle`, `${angle}deg`);
                element.style.setProperty(`--hover-strength`, `${strength}`);
            }),
        ).subscribe();

        observeScopedEvent(this, "load", "img", {
            capture: true
        }).pipe(
            map(([e, img]) => img)
        ).subscribe(img => {
            img.classList.add("loaded");
        });

        this.innerHTML = `
        <section class="intro">
        <div class="goo"></div>
        <svg style="display: none !important;">
  <filter id="gooey">
    <feGaussianBlur in="SourceGraphic" stdDeviation="10"></feGaussianBlur>
    <feColorMatrix values="
        1 0 0 0 0
        0 1 0 0 0
        0 0 1 0 0
        0 0 0 20 -10
        "></feColorMatrix>
  </filter>
</svg>
            <div class="left">
                <div class="background-image"></div>
                <div class="header">
                    <span class="peter">Peter H</span>
                    <span class="nguyen">Nguyen</span>
                    <ul>
                        <li><i class="fa fa-pencil"></i>Illustrator</li>
                        <li><i class="fa fa-palette"></i>Designer</li>
                        <li><i class="fa fa-video"></i>Animator</li>
                    </ul>
                </div>
                <p>From corporate and respectable to bold and dynamic, Peter Nguyen is capable of any visual aesthetic that a client would need. A career spanning comic books and advertising, Peter Nguyen is well accustomed to variable client demands and tight deadlines.</p>
                <a class="button" href="mailto:artofphn@gmail.com">
                    <i class="fa fa-envelope"></i>Contact Me
                </a>
                <div class="examples"><i class="fa fa-arrow-down"></i> Examples</div>
            </div>
            <div class="right">
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
                <div class="video-container">${true ? `<iframe style src="${data.youtubeEmbed}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>` : ``}</div>
            </div>
        </section>
        ${data.categories.map(category =>
            `<section class="category" id="${category.name}" ${category.cssVars ? ` style="${Object.keys(category.cssVars).map(k => `--${k}: ${escapeHtml(category.cssVars[k])}`).join("; ")}"` : ``}>
                <div></div>
                <aside>
                    <h1>${category.name}</h1>
                    ${category.description ? `<article>${category.description}</article>` : ``}
                    <a href="mailto:artofphn@gmail.com" class="button">Contact Me</a>
                </aside>
                <ul${category.listCssVars ? ` style="${Object.keys(category.listCssVars).map(k => `--${k}: ${category.listCssVars[k]}`).join("; ")}"` : ``}>
                    ${category.items.map(item => {
                const img = item.img[category.size ? category.size : "1000x300"];
                return `<li style="--w: ${img.w}; --h: ${img.h}; --aspect-ratio: ${img.w} /${img.h}"><a data-lightbox href="${item.img["full"].filename}"><img src="${img.filename}" loading="lazy"></img></a></li>`
            }).join("")}
                </ul>
            </section>`
        ).join("")}
        <section class="category" id="Motion Graphics">
            <aside>
                <h1>Motion Graphics</h1>
                <article><p>Video is a huge part of any modern company. Whether it be for TV, Youtube, or Social Media, having a motion graphics animator on your team can do wonders for spicing up your posts.</p></article>
            </aside>
            <iframe style src="${data.motionGraphicsEmbed}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </section>`;
    }
}