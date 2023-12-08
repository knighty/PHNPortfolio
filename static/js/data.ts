import { AnyDictionary } from "./types";

type Img = {
    filename: string;
    w: number;
    h: number;
}

type Item = {
    name: string,
    description?: string,
    img: {
        [Key: string]: Img
    },
}

type Category = {
    name: string,
    cssVars?: AnyDictionary,
    description?: string,
    items: Item[],
    size?: string,
}

export default {
    email: `artofphn@gmail.com`,
    youtubeEmbed: `https://www.youtube.com/embed/0Xi1SnC3aBQ?si=0bb8JMil5gKOC99N`,
    intro: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vitae tincidunt arcu. Donec commodo ultricies rutrum. Donec pellentesque volutpat arcu, nec eleifend enim gravida ut. Maecenas sapien leo, commodo quis commodo eget, posuere vitae mi.</p>
    <p>Integer id volutpat nulla. Duis pulvinar sodales nisi, at semper eros. Etiam vitae enim molestie, hendrerit nisl et, tincidunt tellus. Praesent posuere placerat interdum. Pellentesque mollis sem eget vestibulum vehicula.</p>`,
    categories: [
        {
            name: "Graphic Design",
            description: `<p>Versatility is probably one of the most important characteristics of a designer next to reliability. Being able to design for websites, print, media, in styles ranging for corporate professionalism to trendy markets ensures that no matter what your needs as a business are, they can be accomplished.</p>`,
            items: [
                {
                    name: "EVGA 19th Anniversary",
                    img: require("/static/images/Graphic Design/00_evga_04.jpg?sizes=1000x300"),
                },
                {
                    name: "RTX 30 Series",
                    img: require("/static/images/Graphic Design/01_evga_05.jpg?sizes=1000x300"),
                },
                {
                    name: "EVGA Nu Audio",
                    img: require("/static/images/Graphic Design/02_evga_07.jpg?sizes=1000x300"),
                },
                {
                    name: "EVGA",
                    img: require("/static/images/Graphic Design/03_evga_08.jpg?sizes=1000x300"),
                },
                {
                    name: "EVGA Vive Cosmos",
                    img: require("/static/images/Graphic Design/04_evga_09.jpg?sizes=1000x300"),
                },
                {
                    name: "EVGA King Of the Deep",
                    img: require("/static/images/Graphic Design/05_evga_01.jpg?sizes=1000x300"),
                },
                {
                    name: "EVGA King Of the Deep",
                    img: require("/static/images/Graphic Design/06_evga_02.jpg?sizes=1000x300"),
                },
                {
                    name: "EVGA King Of the Deep",
                    img: require("/static/images/Graphic Design/07_evga_03.jpg?sizes=1000x300"),
                },
                {
                    name: "EVGA King Of the Deep",
                    img: require("/static/images/Graphic Design/08_evga_06.jpg?sizes=1000x300"),
                },
                {
                    name: "EVGA King Of the Deep",
                    img: require("/static/images/Graphic Design/10_Brokers_01.jpg?sizes=1000x300"),
                },
                {
                    name: "EVGA King Of the Deep",
                    img: require("/static/images/Graphic Design/11_Brokers_02.jpg?sizes=1000x300"),
                },
                {
                    name: "EVGA King Of the Deep",
                    img: require("/static/images/Graphic Design/12_Brokers_03.jpg?sizes=1000x300"),
                },
                {
                    name: "EVGA King Of the Deep",
                    img: require("/static/images/Graphic Design/13_Brokers_04.jpg?sizes=1000x300"),
                },
                {
                    name: "EVGA King Of the Deep",
                    img: require("/static/images/Graphic Design/14_Brokers_05.jpg?sizes=1000x300"),
                },
                {
                    name: "EVGA King Of the Deep",
                    img: require("/static/images/Graphic Design/15_CMTC.jpg?sizes=1000x300"),
                },
                {
                    name: "EVGA King Of the Deep",
                    img: require("/static/images/Graphic Design/16_Griswold_01.jpg?sizes=1000x300"),
                },
                {
                    name: "EVGA King Of the Deep",
                    img: require("/static/images/Graphic Design/17_Lugersteel_01.jpg?sizes=1000x300"),
                },
                {
                    name: "EVGA King Of the Deep",
                    img: require("/static/images/Graphic Design/18_Lugersteel_02.jpg?sizes=1000x300"),
                },
                {
                    name: "EVGA King Of the Deep",
                    img: require("/static/images/Graphic Design/19_McLaren_01.jpg?sizes=1000x300"),
                },
                {
                    name: "EVGA King Of the Deep",
                    img: require("/static/images/Graphic Design/20_MNJ_01.jpg?sizes=1000x300"),
                },
                {
                    name: "EVGA King Of the Deep",
                    img: require("/static/images/Graphic Design/21_SouthPeek.jpg?sizes=1000x300"),
                },
                {
                    name: "EVGA King Of the Deep",
                    img: require("/static/images/Graphic Design/22_Tomee_01.jpg?sizes=1000x300"),
                },
                {
                    name: "EVGA King Of the Deep",
                    img: require("/static/images/Graphic Design/23_Winmax_01.jpg?sizes=1000x300"),
                },
                {
                    name: "EVGA King Of the Deep",
                    img: require("/static/images/Graphic Design/24_Winmax_02.jpg?sizes=1000x300"),
                },
            ]
        },
        {
            name: "Illustration",
            cssVars: {
                width: "16em",
            },
            size: "1000x400",
            description: `<p>Whether or not your company needs professional level illustration work, rest assured that if you needed it, it could be done.</p>`,
            items: [
                {
                    name: "Riptiders",
                    img: require("/static/images/Illustration/00_Illus_00.jpg?sizes=1000x400"),
                },
                {
                    name: "Riptiders",
                    img: require("/static/images/Illustration/01_Illus_01.jpg?sizes=1000x400"),
                },
                {
                    name: "Riptiders",
                    img: require("/static/images/Illustration/02_Illus_02.jpg?sizes=1000x400"),
                },
                {
                    name: "Riptiders",
                    img: require("/static/images/Illustration/03_Illus_03.jpg?sizes=1000x400"),
                },
                {
                    name: "Riptiders",
                    img: require("/static/images/Illustration/04_Illus_04.jpg?sizes=1000x400"),
                },
                {
                    name: "Riptiders",
                    img: require("/static/images/Illustration/05_Illus_05.jpg?sizes=1000x400"),
                },
                {
                    name: "Riptiders",
                    img: require("/static/images/Illustration/06_Illus_06.jpg?sizes=1000x400"),
                },
                {
                    name: "Riptiders",
                    img: require("/static/images/Illustration/07_Illus_07.jpg?sizes=1000x400"),
                },
                {
                    name: "Riptiders",
                    img: require("/static/images/Illustration/08_Illus_08.jpg?sizes=1000x400"),
                },
                {
                    name: "Riptiders",
                    img: require("/static/images/Illustration/09_Illus_09.jpg?sizes=1000x400"),
                },
            ]
        },
        {
            name: "Logo Design",
            cssVars: {
                width: "5em",
                "max-a": 6
            },
            size: "1000x150",
            description: `<p>Some logos need to be clean and simple, while some need to stand out against a sea of banality. Whichever extreme or anything in between, you can rest assured that your logo will have the thought and care put into it that it deserves.</p>`,
            items: [
                {
                    name: "Brokers",
                    img: require("/static/images/Logos/00_Brokers.jpg?sizes=1000x150"),
                },
                {
                    name: "Mired Media",
                    img: require("/static/images/Logos/01_Mired_01.jpg?sizes=1000x150"),
                },
                {
                    name: "Antique Starz",
                    img: require("/static/images/Logos/02_AntiqueStarz.jpg?sizes=1000x150"),
                },
                {
                    name: "Mired Media",
                    img: require("/static/images/Logos/03_Mired_02.jpg?sizes=1000x150"),
                },
                {
                    name: "Corpse Cable",
                    img: require("/static/images/Logos/04_CorpseCable.jpg?sizes=1000x150"),
                },
                {
                    name: "Lugersteel",
                    img: require("/static/images/Logos/05_Lugersteel.jpg?sizes=1000x150"),
                },
                {
                    name: "Mired Media",
                    img: require("/static/images/Logos/06_Mired_03.jpg?sizes=1000x150"),
                },
                {
                    name: "Frenzy",
                    img: require("/static/images/Logos/07_Frenzy.jpg?sizes=1000x150"),
                },
                {
                    name: "Lotus Tea House",
                    img: require("/static/images/Logos/08_LotusTeaHouse.jpg?sizes=1000x150"),
                },
                {
                    name: "Mired Media",
                    img: require("/static/images/Logos/09_Mired_04.jpg?sizes=1000x150"),
                },
                {
                    name: "MNJ",
                    img: require("/static/images/Logos/10_MNJ.jpg?sizes=1000x150"),
                },
                {
                    name: "Mired Media",
                    img: require("/static/images/Logos/11_Mired_06.jpg?sizes=1000x150"),
                },
                {
                    name: "Mired Media",
                    img: require("/static/images/Logos/12_Pickl.jpg?sizes=1000x150"),
                },
                {
                    name: "Mired Media",
                    img: require("/static/images/Logos/13_Mired_07.jpg?sizes=1000x150"),
                },
                {
                    name: "Mired Media",
                    img: require("/static/images/Logos/14_OCGunstocks.jpg?sizes=1000x150"),
                },
                {
                    name: "Mired Media",
                    img: require("/static/images/Logos/15_Chompit.jpg?sizes=1000x150"),
                },
                {
                    name: "Mired Media",
                    img: require("/static/images/Logos/16_Mired_05.jpg?sizes=1000x150"),
                },
                {
                    name: "Mired Media",
                    img: require("/static/images/Logos/17_Pinheads.jpg?sizes=1000x150"),
                },
                {
                    name: "Mired Media",
                    img: require("/static/images/Logos/18_StreetScene.jpg?sizes=1000x150"),
                },
                {
                    name: "Mired Media",
                    img: require("/static/images/Logos/19_Pulse.jpg?sizes=1000x150"),
                },
                {
                    name: "Mired Media",
                    img: require("/static/images/Logos/20_rar.jpg?sizes=1000x150"),
                },
                {
                    name: "Mired Media",
                    img: require("/static/images/Logos/21_ProjectVehicle.jpg?sizes=1000x150"),
                },
                {
                    name: "Mired Media",
                    img: require("/static/images/Logos/22_Pictal.jpg?sizes=1000x150"),
                },
                {
                    name: "Mired Media",
                    img: require("/static/images/Logos/23_Scylla.jpg?sizes=1000x150"),
                },
                {
                    name: "Mired Media",
                    img: require("/static/images/Logos/24_RoninMechaWorks.jpg?sizes=1000x150"),
                },
                {
                    name: "Mired Media",
                    img: require("/static/images/Logos/25_Riptiders.jpg?sizes=1000x150"),
                },
            ]
        },
        {
            name: "Visualization",
            description: `<p>Sometimes, you just want to see what the product would look like before you spend the time and resources into making it happen. Visualization makes the theoretical a reality, letting you see what your end product could look like in the environment it was meant to be in.</p>`,
            items: [
                {
                    name: "Brokers",
                    img: require("/static/images/Visualization/00_Brokers_01.jpg?sizes=1000x300"),
                },
                {
                    name: "Brokers",
                    img: require("/static/images/Visualization/01_Brokers_02.jpg?sizes=1000x300"),
                },
                {
                    name: "Turkey",
                    img: require("/static/images/Visualization/02_Turkey_01.jpg?sizes=1000x300"),
                },
                {
                    name: "Lotus",
                    img: require("/static/images/Visualization/03_Lotus_01.jpg?sizes=1000x300"),
                },
                {
                    name: "Lotus",
                    img: require("/static/images/Visualization/04_Lotus_03.jpg?sizes=1000x300"),
                },
                {
                    name: "Lotus",
                    img: require("/static/images/Visualization/05_Lotus_02.jpg?sizes=1000x300"),
                },
                {
                    name: "Riptiders",
                    img: require("/static/images/Visualization/06_Rip_02.jpg?sizes=1000x300"),
                },
                {
                    name: "Riptiders",
                    img: require("/static/images/Visualization/07_Rip_03.jpg?sizes=1000x300"),
                },
                {
                    name: "Riptiders",
                    img: require("/static/images/Visualization/08_Rip_01.jpg?sizes=1000x300"),
                },
            ]
        },

    ] as Category[]
};