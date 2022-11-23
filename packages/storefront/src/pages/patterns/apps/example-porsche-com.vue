<template>
  <div class="main-app">
    <PorscheHeader />
    <PorscheMainBar />

    <div class="teaser">
      <img src="./assets/teaser.jpg" width="3600" height="1744" alt="" />
      <div class="teaser__content">
        <p-headline variant="large-title" theme="dark">Soul<br />electrified</p-headline>
        <p-text size="medium" theme="dark">Der neue Taycan Cross Turismo</p-text>
        <p-button theme="dark">Entdecke den neuen Taycan</p-button>
      </div>
    </div>

    <div class="car-range">
      <Card
        :class="{ 'car-range__card': true, [`car-range__card--${car.label.toLowerCase()}`]: true }"
        v-for="(car, page, index) in carRange"
        :key="index"
        :height="{ min: '400px', val: '400px', max: '400px' }"
      >
        <img :src="getImgUrl(car.label)" :width="car.width" :height="car.height" :alt="car.label" />
        <template #top>
          <img :src="getSvgUrl(car.label)" :alt="car.label" height="24" />
          <p-text theme="dark">{{ car.price }}</p-text>
        </template>
        <template #bottom>
          <p-button-group>
            <p-button theme="dark">{{ car.explore }}</p-button>
            <p-button theme="dark" variant="tertiary">{{ car.configure }}</p-button>
          </p-button-group>
        </template>
      </Card>
    </div>

    <div class="car-compare">
      <Card
        class="car-compare__card"
        :shading="false"
        :height="{ min: '25rem', val: '60vh', max: '40rem' }"
        variant="seamless"
        fit="block"
        position="bottom"
      >
        <img src="./assets/compare.png" width="1207" height="414" alt="" />
        <template #top>
          <p-headline variant="headline-3" tag="h2">Vergleichen alle unsere Modelle</p-headline>
          <p-text
            >Vergleiche alle unsere Modelle Verbrenner, Hybrid und E-Modelle miteinander. Egal ob 718, 911, Taycan,
            Panamera, Macan oder Cayenne.</p-text
          >
          <p-button variant="tertiary">Modellauswahl öffnen</p-button>
        </template>
      </Card>
    </div>

    <div id="online-shop-highlights" class="online-shop-highlights">
      <p-carousel heading="Online Shop Highlights" wrap-content="true" slides-per-page="{ base: 1, s: 2, m: 3 }">
        <div class="shop-card">
          <picture>
            <source
              media="(max-width: 480px)"
              srcset="
                https://assets-v2.porsche.com/-/media/Project/PCOM/SharedSite/OneHome/ShopTeaser/ProductTeaser/SHOPmodule_Schlusselanhanger-Wappen_green.jpg?rev=c725bb9dcf9d4512bd19881867c392fe&amp;extension=webp&amp;w=480
              "
            />
            <source
              media="(max-width: 760px)"
              srcset="
                https://assets-v2.porsche.com/-/media/Project/PCOM/SharedSite/OneHome/ShopTeaser/ProductTeaser/SHOPmodule_Schlusselanhanger-Wappen_green.jpg?rev=c725bb9dcf9d4512bd19881867c392fe&amp;extension=webp&amp;w=760
              "
            />
            <source
              media="(max-width: 1000px)"
              srcset="
                https://assets-v2.porsche.com/-/media/Project/PCOM/SharedSite/OneHome/ShopTeaser/ProductTeaser/SHOPmodule_Schlusselanhanger-Wappen_green.jpg?rev=c725bb9dcf9d4512bd19881867c392fe&amp;extension=webp&amp;w=1000
              "
            />
            <source
              media="(max-width: 1920px)"
              srcset="
                https://assets-v2.porsche.com/-/media/Project/PCOM/SharedSite/OneHome/ShopTeaser/ProductTeaser/SHOPmodule_Schlusselanhanger-Wappen_green.jpg?rev=c725bb9dcf9d4512bd19881867c392fe&amp;extension=webp&amp;w=480
              "
            />
            <source
              media="(min-width: 1920px)"
              srcset="
                https://assets-v2.porsche.com/-/media/Project/PCOM/SharedSite/OneHome/ShopTeaser/ProductTeaser/SHOPmodule_Schlusselanhanger-Wappen_green.jpg?rev=c725bb9dcf9d4512bd19881867c392fe&amp;extension=webp&amp;w=480
              "
            />
            <img
              src="https://assets-v2.porsche.com/-/media/Project/PCOM/SharedSite/OneHome/ShopTeaser/ProductTeaser/SHOPmodule_Schlusselanhanger-Wappen_green.jpg?rev=c725bb9dcf9d4512bd19881867c392fe&amp;extension=webp&amp;w=50"
              height="2880"
              width="3840"
              alt="Schlüsselanhänger Wappen"
            />
          </picture>
          <div class="shop-card__bottom">
            <h3>Schlüsselanhänger Wappen</h3>
            <p>Schlüsselanhänger aus Echtleder in Form des <nobr>Porsche</nobr> Wappens.</p>
            <p-link href="#">Schlüsselanhänger</p-link>
          </div>
        </div>

        <div class="shop-card">
          <picture>
            <source
              media="(max-width: 480px)"
              srcset="
                https://assets-v2.porsche.com/-/media/Project/PCOM/SharedSite/OneHome/ShopTeaser/ProductTeaser/SHOPmodule_Porsche-Thermobecher_green.jpg?rev=f559593f3b6d42dcb711037e009f92eb&amp;extension=webp&amp;w=480
              "
            />
            <source
              media="(max-width: 760px)"
              srcset="
                https://assets-v2.porsche.com/-/media/Project/PCOM/SharedSite/OneHome/ShopTeaser/ProductTeaser/SHOPmodule_Porsche-Thermobecher_green.jpg?rev=f559593f3b6d42dcb711037e009f92eb&amp;extension=webp&amp;w=760
              "
            />
            <source
              media="(max-width: 1000px)"
              srcset="
                https://assets-v2.porsche.com/-/media/Project/PCOM/SharedSite/OneHome/ShopTeaser/ProductTeaser/SHOPmodule_Porsche-Thermobecher_green.jpg?rev=f559593f3b6d42dcb711037e009f92eb&amp;extension=webp&amp;w=1000
              "
            />
            <source
              media="(max-width: 1920px)"
              srcset="
                https://assets-v2.porsche.com/-/media/Project/PCOM/SharedSite/OneHome/ShopTeaser/ProductTeaser/SHOPmodule_Porsche-Thermobecher_green.jpg?rev=f559593f3b6d42dcb711037e009f92eb&amp;extension=webp&amp;w=480
              "
            />
            <source
              media="(min-width: 1920px)"
              srcset="
                https://assets-v2.porsche.com/-/media/Project/PCOM/SharedSite/OneHome/ShopTeaser/ProductTeaser/SHOPmodule_Porsche-Thermobecher_green.jpg?rev=f559593f3b6d42dcb711037e009f92eb&amp;extension=webp&amp;w=480
              "
            />
            <img
              src="https://assets-v2.porsche.com/-/media/Project/PCOM/SharedSite/OneHome/ShopTeaser/ProductTeaser/SHOPmodule_Porsche-Thermobecher_green.jpg?rev=f559593f3b6d42dcb711037e009f92eb&amp;extension=webp&amp;w=50"
              height="2880"
              width="3840"
              alt="Porsche Thermobecher"
            />
          </picture>
          <div class="shop-card__bottom">
            <h3>Porsche Thermobecher</h3>
            <p>Hochwertiger Thermo-Isolierbecher aus doppelwandigem Edelstahl.</p>
            <p-link href="#">Thermobecher</p-link>
          </div>
        </div>

        <div class="shop-card">
          <picture>
            <source
              media="(max-width: 480px)"
              srcset="
                https://assets-v2.porsche.com/-/media/Project/PCOM/SharedSite/OneHome/ShopTeaser/ProductTeaser/SHOPmodule_911-Soundbar--Limited-Edition.jpg?rev=6c85c26303dd4d63a7535b21bd26f775&amp;extension=webp&amp;w=480
              "
            />
            <source
              media="(max-width: 760px)"
              srcset="
                https://assets-v2.porsche.com/-/media/Project/PCOM/SharedSite/OneHome/ShopTeaser/ProductTeaser/SHOPmodule_911-Soundbar--Limited-Edition.jpg?rev=6c85c26303dd4d63a7535b21bd26f775&amp;extension=webp&amp;w=760
              "
            />
            <source
              media="(max-width: 1000px)"
              srcset="
                https://assets-v2.porsche.com/-/media/Project/PCOM/SharedSite/OneHome/ShopTeaser/ProductTeaser/SHOPmodule_911-Soundbar--Limited-Edition.jpg?rev=6c85c26303dd4d63a7535b21bd26f775&amp;extension=webp&amp;w=1000
              "
            />
            <source
              media="(max-width: 1920px)"
              srcset="
                https://assets-v2.porsche.com/-/media/Project/PCOM/SharedSite/OneHome/ShopTeaser/ProductTeaser/SHOPmodule_911-Soundbar--Limited-Edition.jpg?rev=6c85c26303dd4d63a7535b21bd26f775&amp;extension=webp&amp;w=480
              "
            />
            <source
              media="(min-width: 1920px)"
              srcset="
                https://assets-v2.porsche.com/-/media/Project/PCOM/SharedSite/OneHome/ShopTeaser/ProductTeaser/SHOPmodule_911-Soundbar--Limited-Edition.jpg?rev=6c85c26303dd4d63a7535b21bd26f775&amp;extension=webp&amp;w=480
              "
            />
            <img
              src="https://assets-v2.porsche.com/-/media/Project/PCOM/SharedSite/OneHome/ShopTeaser/ProductTeaser/SHOPmodule_911-Soundbar--Limited-Edition.jpg?rev=6c85c26303dd4d63a7535b21bd26f775&amp;extension=webp&amp;w=50"
              height="2880"
              width="3840"
              alt="911 Soundbar – Limited Edition"
            />
          </picture>

          <div class="shop-card__bottom">
            <h3>911 Soundbar – Limited Edition</h3>
            <p>2.1-Virtual-Surround-System mit Original-Abgasanlage des 911 GT3 als Subwoofer-Erweiterung.</p>
            <p-link href="#">Soundbar</p-link>
          </div>
        </div>

        <div class="shop-card">
          <picture>
            <source
              media="(max-width: 480px)"
              srcset="
                https://assets-v2.porsche.com/-/media/Project/PCOM/SharedSite/OneHome/ShopTeaser/ProductTeaser/SHOPmodule_50Y-Sunglasses-P8478.jpg?rev=d81ccf8aa415475da71d04727bffc634&amp;extension=webp&amp;w=480
              "
            />
            <source
              media="(max-width: 760px)"
              srcset="
                https://assets-v2.porsche.com/-/media/Project/PCOM/SharedSite/OneHome/ShopTeaser/ProductTeaser/SHOPmodule_50Y-Sunglasses-P8478.jpg?rev=d81ccf8aa415475da71d04727bffc634&amp;extension=webp&amp;w=760
              "
            />
            <source
              media="(max-width: 1000px)"
              srcset="
                https://assets-v2.porsche.com/-/media/Project/PCOM/SharedSite/OneHome/ShopTeaser/ProductTeaser/SHOPmodule_50Y-Sunglasses-P8478.jpg?rev=d81ccf8aa415475da71d04727bffc634&amp;extension=webp&amp;w=1000
              "
            />
            <source
              media="(max-width: 1920px)"
              srcset="
                https://assets-v2.porsche.com/-/media/Project/PCOM/SharedSite/OneHome/ShopTeaser/ProductTeaser/SHOPmodule_50Y-Sunglasses-P8478.jpg?rev=d81ccf8aa415475da71d04727bffc634&amp;extension=webp&amp;w=480
              "
            />
            <source
              media="(min-width: 1920px)"
              srcset="
                https://assets-v2.porsche.com/-/media/Project/PCOM/SharedSite/OneHome/ShopTeaser/ProductTeaser/SHOPmodule_50Y-Sunglasses-P8478.jpg?rev=d81ccf8aa415475da71d04727bffc634&amp;extension=webp&amp;w=480
              "
            />
            <img
              src="https://assets-v2.porsche.com/-/media/Project/PCOM/SharedSite/OneHome/ShopTeaser/ProductTeaser/SHOPmodule_50Y-Sunglasses-P8478.jpg?rev=d81ccf8aa415475da71d04727bffc634&amp;extension=webp&amp;w=50"
              height="2880"
              width="3840"
              alt="50Y Sunglasses P´8478"
            />
          </picture>
          <div class="shop-card__bottom">
            <h3>50Y Sunglasses P´8478</h3>
            <p>
              Porsche Design Pilotenbrille für Damen und Herren mit polarisierten Base-2-Curve-Gläsern und
              Wechselgläsern.
            </p>
            <p-link href="#">Sonnenbrille</p-link>
          </div>
        </div>

        <div class="shop-card">
          <picture>
            <source
              media="(max-width: 480px)"
              srcset="
                https://assets-v2.porsche.com/-/media/Project/PCOM/SharedSite/OneHome/ShopTeaser/ProductTeaser/SHOPmodule_Buchstutze.jpg?rev=b821d6e21f284fb4ba81ae255ea8a543&amp;extension=webp&amp;w=480
              "
            />
            <source
              media="(max-width: 760px)"
              srcset="
                https://assets-v2.porsche.com/-/media/Project/PCOM/SharedSite/OneHome/ShopTeaser/ProductTeaser/SHOPmodule_Buchstutze.jpg?rev=b821d6e21f284fb4ba81ae255ea8a543&amp;extension=webp&amp;w=760
              "
            />
            <source
              media="(max-width: 1000px)"
              srcset="
                https://assets-v2.porsche.com/-/media/Project/PCOM/SharedSite/OneHome/ShopTeaser/ProductTeaser/SHOPmodule_Buchstutze.jpg?rev=b821d6e21f284fb4ba81ae255ea8a543&amp;extension=webp&amp;w=1000
              "
            />
            <source
              media="(max-width: 1920px)"
              srcset="
                https://assets-v2.porsche.com/-/media/Project/PCOM/SharedSite/OneHome/ShopTeaser/ProductTeaser/SHOPmodule_Buchstutze.jpg?rev=b821d6e21f284fb4ba81ae255ea8a543&amp;extension=webp&amp;w=480
              "
            />
            <source
              media="(min-width: 1920px)"
              srcset="
                https://assets-v2.porsche.com/-/media/Project/PCOM/SharedSite/OneHome/ShopTeaser/ProductTeaser/SHOPmodule_Buchstutze.jpg?rev=b821d6e21f284fb4ba81ae255ea8a543&amp;extension=webp&amp;w=480
              "
            />
            <img
              src="https://assets-v2.porsche.com/-/media/Project/PCOM/SharedSite/OneHome/ShopTeaser/ProductTeaser/SHOPmodule_Buchstutze.jpg?rev=b821d6e21f284fb4ba81ae255ea8a543&amp;extension=webp&amp;w=50"
              height="2880"
              width="3840"
              alt="Buchstütze"
            />
          </picture>
          <div class="shop-card__bottom">
            <h3>Buchstütze</h3>
            <p>Buchstütze aus Original-Bremsscheibe des Porsche 911 Carrera.</p>
            <p-link href="#">Buchstütze</p-link>
          </div>
        </div>

        <div class="shop-card">
          <picture>
            <source
              media="(max-width: 480px)"
              srcset="
                https://assets-v2.porsche.com/-/media/Project/PCOM/SharedSite/OneHome/ShopTeaser/ProductTeaser/SHOPmodule_Roadster-Hardcase-4W-Trolley-S.jpg?rev=c2f3921231c24cf0b494fc8b25988e02&amp;extension=webp&amp;w=480
              "
            />
            <source
              media="(max-width: 760px)"
              srcset="
                https://assets-v2.porsche.com/-/media/Project/PCOM/SharedSite/OneHome/ShopTeaser/ProductTeaser/SHOPmodule_Roadster-Hardcase-4W-Trolley-S.jpg?rev=c2f3921231c24cf0b494fc8b25988e02&amp;extension=webp&amp;w=760
              "
            />
            <source
              media="(max-width: 1000px)"
              srcset="
                https://assets-v2.porsche.com/-/media/Project/PCOM/SharedSite/OneHome/ShopTeaser/ProductTeaser/SHOPmodule_Roadster-Hardcase-4W-Trolley-S.jpg?rev=c2f3921231c24cf0b494fc8b25988e02&amp;extension=webp&amp;w=1000
              "
            />
            <source
              media="(max-width: 1920px)"
              srcset="
                https://assets-v2.porsche.com/-/media/Project/PCOM/SharedSite/OneHome/ShopTeaser/ProductTeaser/SHOPmodule_Roadster-Hardcase-4W-Trolley-S.jpg?rev=c2f3921231c24cf0b494fc8b25988e02&amp;extension=webp&amp;w=480
              "
            />
            <source
              media="(min-width: 1920px)"
              srcset="
                https://assets-v2.porsche.com/-/media/Project/PCOM/SharedSite/OneHome/ShopTeaser/ProductTeaser/SHOPmodule_Roadster-Hardcase-4W-Trolley-S.jpg?rev=c2f3921231c24cf0b494fc8b25988e02&amp;extension=webp&amp;w=480
              "
            />
            <img
              src="https://assets-v2.porsche.com/-/media/Project/PCOM/SharedSite/OneHome/ShopTeaser/ProductTeaser/SHOPmodule_Roadster-Hardcase-4W-Trolley-S.jpg?rev=c2f3921231c24cf0b494fc8b25988e02&amp;extension=webp&amp;w=50"
              height="2880"
              width="3840"
              alt="Roadster Hardcase 4W Trolley S"
            />
          </picture>
          <div class="shop-card__bottom">
            <h3>Roadster Hardcase 4W Trolley S</h3>
            <p>Kleiner Designer-Trolley aus leichtem Kunststoff mit 4 Rädern im exklusiven Design.</p>
            <p-link href="#">Trolley</p-link>
          </div>
        </div>

        <div class="shop-card">
          <picture>
            <source
              media="(max-width: 480px)"
              srcset="
                https://assets-v2.porsche.com/-/media/Project/PCOM/SharedSite/OneHome/ShopTeaser/ProductTeaser/SHOPmodule_Trainingsjacke--RS-27.jpg?rev=f394a2535b154a268f5f1202636303d4&amp;extension=webp&amp;w=480
              "
            />
            <source
              media="(max-width: 760px)"
              srcset="
                https://assets-v2.porsche.com/-/media/Project/PCOM/SharedSite/OneHome/ShopTeaser/ProductTeaser/SHOPmodule_Trainingsjacke--RS-27.jpg?rev=f394a2535b154a268f5f1202636303d4&amp;extension=webp&amp;w=760
              "
            />
            <source
              media="(max-width: 1000px)"
              srcset="
                https://assets-v2.porsche.com/-/media/Project/PCOM/SharedSite/OneHome/ShopTeaser/ProductTeaser/SHOPmodule_Trainingsjacke--RS-27.jpg?rev=f394a2535b154a268f5f1202636303d4&amp;extension=webp&amp;w=1000
              "
            />
            <source
              media="(max-width: 1920px)"
              srcset="
                https://assets-v2.porsche.com/-/media/Project/PCOM/SharedSite/OneHome/ShopTeaser/ProductTeaser/SHOPmodule_Trainingsjacke--RS-27.jpg?rev=f394a2535b154a268f5f1202636303d4&amp;extension=webp&amp;w=480
              "
            />
            <source
              media="(min-width: 1920px)"
              srcset="
                https://assets-v2.porsche.com/-/media/Project/PCOM/SharedSite/OneHome/ShopTeaser/ProductTeaser/SHOPmodule_Trainingsjacke--RS-27.jpg?rev=f394a2535b154a268f5f1202636303d4&amp;extension=webp&amp;w=480
              "
            />
            <img
              src="https://assets-v2.porsche.com/-/media/Project/PCOM/SharedSite/OneHome/ShopTeaser/ProductTeaser/SHOPmodule_Trainingsjacke--RS-27.jpg?rev=f394a2535b154a268f5f1202636303d4&amp;extension=webp&amp;w=50"
              height="2880"
              width="3840"
              alt="Trainingsjacke – RS 2.7"
            />
          </picture>
          <div class="shop-card__bottom">
            <h3>Trainingsjacke – RS 2.7</h3>
            <p>Sportlich-moderne Trainingsjacke für Herren mit Stehkragen und RS 2.7 Druck.</p>
            <p-link href="#">Trainingsjacke</p-link>
          </div>
        </div>

        <div class="shop-card">
          <picture>
            <source
              media="(max-width: 480px)"
              srcset="
                https://assets-v2.porsche.com/-/media/Project/PCOM/SharedSite/OneHome/ShopTeaser/ProductTeaser/SHOPmodule_50Y-Cardholder-4.jpg?rev=b6a3acd5ff784094a1a205d372009194&amp;extension=webp&amp;w=480
              "
            />
            <source
              media="(max-width: 760px)"
              srcset="
                https://assets-v2.porsche.com/-/media/Project/PCOM/SharedSite/OneHome/ShopTeaser/ProductTeaser/SHOPmodule_50Y-Cardholder-4.jpg?rev=b6a3acd5ff784094a1a205d372009194&amp;extension=webp&amp;w=760
              "
            />
            <source
              media="(max-width: 1000px)"
              srcset="
                https://assets-v2.porsche.com/-/media/Project/PCOM/SharedSite/OneHome/ShopTeaser/ProductTeaser/SHOPmodule_50Y-Cardholder-4.jpg?rev=b6a3acd5ff784094a1a205d372009194&amp;extension=webp&amp;w=1000
              "
            />
            <source
              media="(max-width: 1920px)"
              srcset="
                https://assets-v2.porsche.com/-/media/Project/PCOM/SharedSite/OneHome/ShopTeaser/ProductTeaser/SHOPmodule_50Y-Cardholder-4.jpg?rev=b6a3acd5ff784094a1a205d372009194&amp;extension=webp&amp;w=480
              "
            />
            <source
              media="(min-width: 1920px)"
              srcset="
                https://assets-v2.porsche.com/-/media/Project/PCOM/SharedSite/OneHome/ShopTeaser/ProductTeaser/SHOPmodule_50Y-Cardholder-4.jpg?rev=b6a3acd5ff784094a1a205d372009194&amp;extension=webp&amp;w=480
              "
            />
            <img
              src="https://assets-v2.porsche.com/-/media/Project/PCOM/SharedSite/OneHome/ShopTeaser/ProductTeaser/SHOPmodule_50Y-Cardholder-4.jpg?rev=b6a3acd5ff784094a1a205d372009194&amp;extension=webp&amp;w=50"
              height="2880"
              width="3840"
              alt="50Y Cardholder 4"
            />
          </picture>
          <div class="shop-card__bottom">
            <h3>50Y Cardholder 4</h3>
            <p>Exklusives Visitenkartenetui für Herren aus Leder. 50Y Porsche Design Limited Edition.</p>
            <p-link href="#">Cardholder</p-link>
          </div>
        </div>
      </p-carousel>
    </div>

    <div class="accessories">
      <Card
        class="accessories__card accessories__card--equipment"
        :shading="false"
        :height="{ min: '35rem', val: '35rem', max: '35rem' }"
        fit="block"
        position="bottom"
      >
        <img src="./assets/car-box.png" alt="" />
        <template #top>
          <p-headline variant="headline-3">Immer das richtige Fahrzeugzubehör zur Hand</p-headline>
          <p-button variant="tertiary">Zum Porsche Tequipment Shop</p-button>
        </template>
      </Card>
      <Card
        class="accessories__card accessories__card--watch"
        :shading="false"
        :height="{ min: '35rem', val: '35rem', max: '35rem' }"
        fit="block"
        position="bottom"
      >
        <img src="./assets/chrono.png" alt="" />
        <template #top>
          <p-headline variant="headline-3">Finde die Porsche Accessoires zu deinem Traumsportwagen</p-headline>
          <p-button variant="tertiary">Zum Porsche Design Shop</p-button>
        </template>
      </Card>
      <Card class="accessories__card accessories__card--electric" :height="{ min: '25rem', val: '50vh', max: '35rem' }">
        <img src="./assets/teaser-ev.png" width="1280" height="624" alt="" />
        <template #top>
          <p-headline theme="dark" variant="headline-3">Porsche E-Performance</p-headline>
          <p-text theme="dark"
            >Entdecke unsere Porsche E-Performance mit unseren Elektro- und Plug-in-Hybrid-Modellen, der 800V und
            unserer durchdachten weltweiten Ladeinfrastruktur.</p-text
          >
          <p-button theme="dark" variant="tertiary">Mehr zu Porsche E-Performance</p-button>
        </template>
      </Card>
    </div>

    <PorscheFooter />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import Card from '@/components/Card.vue';
  import PorscheHeader from '@/components/PorscheHeader.vue';
  import PorscheMainBar from '@/components/PorscheMainBar.vue';
  import PorscheFooter from '@/components/PorscheFooter.vue';

  @Component({
    components: {
      Card,
      PorscheHeader,
      PorscheMainBar,
      PorscheFooter,
    },
  })
  export default class ExamplePorscheCom extends Vue {
    public carRange: {
      label: string;
      price: string;
      explore: string;
      configure: string;
      width: number;
      height: number;
    }[] = [
      {
        label: '718',
        price: 'Ab EUR 59.228,00 inkl. MwSt.',
        explore: 'Entdecke alle 718 Modelle',
        configure: 'Konfiguriere deinen 718er',
        width: 2048,
        height: 1366,
      },
      {
        label: '911',
        price: 'Ab EUR 113.492,00 inkl. MwSt.',
        explore: 'Entdecke alle 911 Modelle',
        configure: 'Konfiguriere deinen 911er',
        width: 2048,
        height: 153,
      },
      {
        label: 'Taycan',
        price: 'Ab EUR 88.399,00 inkl. MwSt.',
        explore: 'Entdecke alle Taycan Modelle',
        configure: 'Konfiguriere deinen Taycan',
        width: 2048,
        height: 1738,
      },
      {
        label: 'Panamera',
        price: 'Ab EUR 98.022,00 inkl. MwSt.',
        explore: 'Entdecke alle Panamera Modelle',
        configure: 'Konfiguriere deinen Panamera',
        width: 2048,
        height: 1536,
      },
      {
        label: 'Macan',
        price: 'Ab EUR 65.773,00 inkl. MwSt.',
        explore: 'Entdecke alle Macan Modelle',
        configure: 'Konfiguriere deinen Macan',
        width: 2048,
        height: 1534,
      },
      {
        label: 'Cayenne',
        price: 'Ab EUR 82.909,00 inkl. MwSt.',
        explore: 'Entdecke alle Cayenne Modelle',
        configure: 'Konfiguriere deinen Cayenne',
        width: 2048,
        height: 1366,
      },
    ];

    getImgUrl(car: string): string {
      const images = require.context('./assets/', false, /\.jpg$/);
      return images(`./${car.toLowerCase()}.jpg`);
    }

    getSvgUrl(car: string): string {
      const images = require.context('./assets/', false, /\.svg$/);
      return images(`./${car.toLowerCase()}.svg`);
    }

    mounted(): void {
      const { hash } = window.location;

      if (hash) {
        const el = this.$el.querySelector(hash) as HTMLElement;

        if (el) {
          window.scrollTo({
            top: el.offsetTop,
            behavior: window.matchMedia('(prefers-reduced-motion)').matches ? 'auto' : 'smooth',
          });
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@porsche-design-system/components-js/utilities/scss';

  .teaser {
    @include pds-grid;
    align-items: end;

    img {
      grid-area: 1 / grid-start / 1 / grid-end;
      width: 100%;
      height: 60vh;
      min-height: 25rem;
      max-height: 40rem;
      object-fit: cover;
      object-position: center;
    }

    &__content {
      grid-area: 1 / content-start / 1 / content-end;
      margin-bottom: $pds-spacing-large;
      display: flex;
      flex-direction: column;
      gap: $pds-spacing-medium;
      align-items: flex-start;
    }
  }

  .car-range {
    @include pds-grid;
    margin-top: calc(#{$pds-grid-gap} * 3);

    &__card {
      grid-column: content-start / content-end;
    }

    @include pds-media-query-min('m') {
      grid-template-areas:
        'l p718   p718   p718   p718   p718   p718   p911     p911     p911     p911     p911     p911     r'
        'l taycan taycan taycan taycan taycan taycan panamera panamera panamera panamera panamera panamera r'
        'l macan  macan  macan  macan  macan  macan  cayenne  cayenne  cayenne  cayenne  cayenne  cayenne  r';

      &__card {
        &--718 {
          grid-area: p718;
        }

        &--911 {
          grid-area: p911;
        }

        &--taycan {
          grid-area: taycan;
        }

        &--panamera {
          grid-area: panamera;
        }

        &--macan {
          grid-area: macan;
        }

        &--cayenne {
          grid-area: cayenne;
        }
      }
    }
  }

  .car-compare {
    @include pds-grid;
    margin-top: calc(#{$pds-grid-gap} * 3);
    background: $pds-theme-light-background-surface;
    padding-top: $pds-spacing-large;
    padding-bottom: $pds-spacing-large;

    &__card {
      grid-column: content-start / content-end;
    }
  }

  .online-shop-highlights {
    @include pds-grid;
    background: $pds-theme-light-background-surface;
    padding-top: $pds-spacing-large;
    padding-bottom: $pds-spacing-large;

    p-carousel {
      grid-column: grid-start / grid-end;
    }
  }

  .shop-card {
    display: flex;
    flex-direction: column;
    height: 100%;
    background: $pds-theme-light-background-base;

    picture {
      display: block;
      padding: $pds-spacing-large;
    }

    img {
      max-width: 100%;
      height: auto;
      vertical-align: middle;
    }

    h3 {
      @include pds-heading-small;
      margin: 0 0 $pds-spacing-small;
    }

    p {
      margin: 0 0 $pds-spacing-medium;
    }

    p-link {
      margin: auto auto 0 0;
    }

    &__bottom {
      display: flex;
      flex-direction: column;
      height: 100%;
      padding: $pds-spacing-large;
      @include pds-text-small;
    }
  }

  .accessories {
    @include pds-grid;
    margin-top: calc(#{$pds-grid-gap} * 3);

    &__card {
      grid-column: 3 / -3;
    }

    @include pds-media-query-min('m') {
      grid-template-areas:
        'l l equipment equipment equipment equipment equipment watch    watch    watch    watch    watch    r r'
        'l l electric  electric  electric  electric  electric  electric electric electric electric electric r r';

      &__card {
        &--equipment {
          grid-area: equipment;
        }

        &--watch {
          grid-area: watch;
        }

        &--electric {
          grid-area: electric;
        }
      }
    }
  }
</style>
