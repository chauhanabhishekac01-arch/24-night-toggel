document.addEventListener('DOMContentLoaded', () => {
    // --- INITIALIZATION ---
    if (!history.state) {
        history.replaceState({ page: 'grid' }, document.title, location.href);
    }

    // --- DOM ELEMENTS ---
    const collectionGrid = document.getElementById('collection-grid');
    const productGrid = document.getElementById('product-grid');
    const productSlider = document.getElementById('product-slider');
    const orderSidebar = document.getElementById('orderSidebar');
    const searchInput = document.getElementById('product-search');
    const clearSearch = document.getElementById('clear-search');
    const searchSuggestions = document.getElementById('search-suggestions');
    const cartPopup = document.getElementById('cart-popup');
    const custNameInput = document.getElementById('cust-name');
    const custAddressInput = document.getElementById('cust-address');
    const whatsappBtn = document.getElementById('checkout-whatsapp');
    const pgroupslider = document.getElementById('pgroupslider');
    const dateElement = document.getElementById('current-date');
    const countElement = document.getElementById('online-count');
    const counters = document.querySelectorAll('.counter');
    const splash = document.getElementById('splash-screen');
    const currentTheme = localStorage.getItem('theme');
    const checkbox = document.getElementById('checkbox');
    const body = document.body;

    // --- DATA ---
    const collections = [
        { id: "beverages", name: "Beverages", previews: ["dwater.jpg", "dcokeb.jpg", "dcokec.jpg", "dpepsi.jpg"] },
        { id: "snacks", name: "Snacks", previews: ["ssalted.jpg", "skurkurem.jpg", "slaysg.jpg", "skurkurec.jpg"] },
        { id: "biscuits", name: "Biscuits", previews: ["bicrakjack.jpg", "biparleg.jpg", "bihideandseek.jpg", "bioreo.jpg"] },
        { id: "chocolates", name: "Chocolates", previews: ["chdc.jpg", "chcrispello.jpg", "chfruitnnut.jpg", "chkinderjoy.jpg"] },
        { id: "cleaningessentials", name: "Cleaning", previews: ["clarielb.jpg", "clharpic.jpg", "clodonill.jpg", "clfeathern.jpg"] },
        { id: "personal", name: "Personal Care", previews: ["pccomb.jpg", "pcalmond.jpg", "pcgillette.jpg", "pctowel.jpg"] }
    ];

    const products = [
/*Drink*/               { id: 1,   name: "Bottle-Pepsi",                                                             image: "dpepsi.jpg",            cat: "beverages",       subcat: "Cold Drink",                   selectedVariant: "S",           variants: { "S":        { price: 40, count: 0, unit: "750ml" }, "L": { price: 90, count: 0, unit: "2L" } } },
                        { id: 2,   name: "Bottle-Coca-Cola",                                                  image: "dcokeb.jpg",            cat: "beverages",       subcat: "Cold Drink",                   selectedVariant: "S",           variants: { "S":        { price: 40, count: 0, unit: "750ml" }, "L": { price: 90, count: 0, unit: "2L" } } },
                        { id: 3,   name: "Sprite",                                                           image: "dsprite.jpg",           cat: "beverages",       subcat: "Cold Drink",                   selectedVariant: "S",           variants: { "S":        { price: 40, count: 0, unit: "750ml" }, "L": { price: 90, count: 0, unit: "2L" } } },
                        { id: 31,  name: "Can-Coca-Cola",                                                   image: "dcokec.jpg",            cat: "beverages",       subcat: "Cold Drink",                          selectedVariant: "S",           variants: { "S":        { price: 40, count: 0, unit: "300ml" } } },
                        { id: 32,  name: "Can-Dite Coke",                                                   image: "dcoked.jpg",            cat: "beverages",       subcat: "Cold Drink",                          selectedVariant: "S",           variants: { "S":        { price: 40, count: 0, unit: "500ml" } } },
                        { id: 33,  name: "Can-Pepsi Zero Sugar",                                                image: "dpepsiz.jpg",           cat: "beverages",       subcat: "Cold Drink",                          selectedVariant: "S",           variants: { "S":        { price: 40, count: 0, unit: "300ml" } } },
                        { id: 34,  name: "Can-Mountain Dew",                                                   image: "dmountain.jpg",         cat: "beverages",       subcat: "Cold Drink",                          selectedVariant: "S",           variants: { "S":        { price: 40, count: 0, unit: "300ml" } } },

                /*Juice*/{ id: 4,  name: "Frooti Mango",                                                    image: "dfrooti.jpg",           cat: "beverages",       subcat: "Juices",                       selectedVariant: "S",           variants: { "S":        { price: 10, count: 0, unit: "150ml" }, "L": { price: 105, count: 0, unit: "2L" } } },
                         { id: 5,  name: "Maaza",                                                           image: "dmaaza.jpg",            cat: "beverages",       subcat: "Juices",                       selectedVariant: "S",           variants: { "S":        { price: 50, count: 0, unit: "600ml" }, "L": { price: 80, count: 0, unit: "1.75L" } } },
                         { id: 6,  name: "Real Fruit Power Orange Juice",                                   image: "drealo.jpg",            cat: "beverages",       subcat: "Juices",                       selectedVariant: "L",           variants: { "L":        { price: 125, count: 0, unit: "1L" } } },
                         { id: 7,  name: "Real Fruit Power Guava Juice",                                    image: "drealg.jpg",            cat: "beverages",       subcat: "Juices",                       selectedVariant: "L",           variants: { "L":        { price: 115, count: 0, unit: "1L" } } },
                         { id: 8,  name: "Real Fruit Power Litchi Juice",                                   image: "dreall.jpg",            cat: "beverages",       subcat: "Juices",                       selectedVariant: "L",           variants: { "L":        { price: 120, count: 0, unit: "1L" } } },

         /*Energy Drink*/{ id: 9,  name: "Hell Classic",                                                    image: "dhellc.jpg",            cat: "beverages",       subcat: "Energy Drinks",                selectedVariant: "L",           variants: { "L":        { price: 60, count: 0, unit: "250ml" } } },    
                         { id: 10,  name: "Hell Watermelon",                                                 image: "dhellw.jpg",            cat: "beverages",       subcat: "Energy Drinks",                selectedVariant: "L",           variants: { "L":        { price: 60, count: 0, unit: "250ml" } } },    
                         { id: 11,  name: "Hell Black Cherry",                                               image: "dhellbc.jpg",           cat: "beverages",       subcat: "Energy Drinks",                selectedVariant: "L",           variants: { "L":        { price: 60, count: 0, unit: "250ml" } } },
                         { id: 12,  name: "Red Bull",                                                       image: "dred.jpg",              cat: "beverages",       subcat: "Energy Drinks",                          selectedVariant: "S",           variants: { "S":        { price: 40, count: 0, unit: "300ml" } } },
                         { id: 13,  name: "Monster Zero Sugar Ultra",                                       image: "dmonster.jpg",              cat: "beverages",       subcat: "Energy Drinks",                selectedVariant: "S",           variants: { "S":        { price: 125, count: 0, unit: "350ml" } } },

            /*Mogu Mogu*/{ id: 14,  name: "Strawberry Fruit Drink",                                         image: "dmogus.jpg",            cat: "beverages",       subcat: "Mogu Mogu",                    selectedVariant: "S",           variants: { "S":        { price: 70, count: 0, unit: "320ml" } } },
                         { id: 15,  name: "Lychee Fruit Drink with Nata De Coco",                           image: "dmogul.jpg",            cat: "beverages",       subcat: "Mogu Mogu",                    selectedVariant: "S",           variants: { "S":        { price: 70, count: 0, unit: "320ml" } } },
                         { id: 16,  name: "Blackcurrant Drink with Nata De Coco",                           image: "dmogub.jpg",            cat: "beverages",       subcat: "Mogu Mogu",                    selectedVariant: "S",           variants: { "S":        { price: 70, count: 0, unit: "320ml" } } },
                         { id: 17,  name: "Grape Fruit Drink with Nata De Coco",                            image: "dmogug.jpg",            cat: "beverages",       subcat: "Mogu Mogu",                    selectedVariant: "S",           variants: { "S":        { price: 70, count: 0, unit: "320ml" } } },
                         { id: 18,  name: "Mango Drink",                                                    image: "dmogum.jpg",            cat: "beverages",       subcat: "Mogu Mogu",                    selectedVariant: "S",           variants: { "S":        { price: 70, count: 0, unit: "320ml" } } },
                         { id: 19,  name: "Melon Fruit Drink with Nata De Coco",                            image: "dmogumelon.jpg",        cat: "beverages",       subcat: "Mogu Mogu",                    selectedVariant: "S",           variants: { "S":        { price: 70, count: 0, unit: "320ml" } } },
                         { id: 20,  name: "Pineapple Fruit Drink",                                          image: "dmogup.jpg",            cat: "beverages",       subcat: "Mogu Mogu",                    selectedVariant: "S",           variants: { "S":        { price: 70, count: 0, unit: "320ml" } } },


                 /*Milk*/{ id: 21,  name: "Amul Kool Kesar",                                                 image: "damulk.jpg",            cat: "beverages",       subcat: "Amul",                         selectedVariant: "S",           variants: { "S":        { price: 25, count: 0, unit: "180ml" } } },
                         { id: 22,  name: "Amul Masti Spiced Salted Buttermilk",                             image: "damulc.jpg",            cat: "beverages",       subcat: "Amul",                         selectedVariant: "S",           variants: { "S":        { price: 15, count: 0, unit: "200ml" } } },
                         { id: 23,  name: "Amul Lassi",                                                      image: "damull.jpg",            cat: "beverages",       subcat: "Amul",                         selectedVariant: "S",           variants: { "S":        { price: 25, count: 0, unit: "200ml" } } },
                 
                /*Water*/{ id: 24,  name: "Mineral Water",                                                   image: "dwater.jpg",            cat: "beverages",       subcat: "Water & Soda",                 selectedVariant: "S",           variants: { "S":        { price: 20, count: 0, unit: "1L" }, "L": { price: 70, count: 0, unit: "5L" } } },
                         { id: 25,  name: "Schweppes Indian Tonic Water",                                    image: "dschweppesi.jpg",       cat: "beverages",       subcat: "Water & Soda",                 selectedVariant: "S",           variants: { "S":        { price: 60, count: 0, unit: "300ml" } } },
                         { id: 26,  name: "Duke's Club Soda Water",                                          image: "dschweppesi.jpg",       cat: "beverages",       subcat: "Water & Soda",                 selectedVariant: "S",           variants: { "S":        { price: 20, count: 0, unit: "750ml" } } },
                         { id: 27, name: "O'cean Pink Guava Water",                                         image: "dwog.jpg",              cat: "beverages",       subcat: "Water & Soda",                       selectedVariant: "S",           variants: { "S":        { price: 60, count: 0, unit: "500ml" } } },
                         { id: 28, name: "O'cean Peach & Passion Water",                                    image: "dwop.jpg",              cat: "beverages",       subcat: "Water & Soda",                       selectedVariant: "S",           variants: { "S":        { price: 60, count: 0, unit: "500ml" } } },
                         { id: 29, name: "O'cean Crispy Apple Water",                                       image: "dwoa.jpg",              cat: "beverages",       subcat: "Water & Soda",                       selectedVariant: "S",           variants: { "S":        { price: 60, count: 0, unit: "500ml" } } },
                         { id: 30, name: "O'cean Lychee Flavoured Water",                                   image: "dwol.jpg",              cat: "beverages",       subcat: "Water & Soda",                       selectedVariant: "S",           variants: { "S":        { price: 60, count: 0, unit: "500ml" } } },
                         
                  /*Can*/
                         
                
/* Chocolates */
                        
                        
                        
                        
             /*Cadbury*/{ id: 2001, name: "Cadbury Dairy Milk Crackle Milk",                                image: "ccadburyc.jpg",         cat: "chocolates",                subcat: "Cadbury",           selectedVariant: "Wgt.",        variants: { "Wgt.":     { price: 50, count: 0, unit: "36g" } } },
                        { id: 2002, name: "Cadbury Dairy Milk Fruit and Nut",                               image: "chfruitnnut.jpg",       cat: "chocolates",                subcat: "Cadbury",           selectedVariant: "Wgt.",        variants: { "Wgt.":     { price: 100, count: 0, unit: "75g" } } },     
                        { id: 2003, name: "Cadbury Dairy Milk Roast Almond Milk",                           image: "chfruitnnut.jpg",       cat: "chocolates",                subcat: "Cadbury",           selectedVariant: "Wgt.",        variants: { "Wgt.":     { price: 50, count: 0, unit: "36g" } } },     
                        { id: 2004, name: "Cadbury Lickables",                                              image: "clickables.jpg",        cat: "chocolates",                subcat: "Cadbury",           selectedVariant: "Wgt.",        variants: { "Wgt.":     { price: 45, count: 0, unit: "20g" } } },
                        { id: 2005, name: "Cadbury Nutties",                                                image: "cnutties.jpg",          cat: "chocolates",                subcat: "Cadbury",           selectedVariant: "Wgt.",        variants: { "Wgt.":     { price: 45, count: 0, unit: "30g" } } },
                        { id: 2006, name: "Cadbury Dairy Milk Crispello Milk",                              image: "chcrispello.jpg",       cat: "chocolates",                subcat: "Cadbury",           selectedVariant: "Wgt.",        variants: { "Wgt.":     { price: 40, count: 0, unit: "35g" } } },
                        { id: 2007, name: "Cadbury Fuse Peanut & Caramel",                                  image: "chfuse.jpg",            cat: "chocolates",                subcat: "Cadbury",           selectedVariant: "Wgt.",        variants: { "Wgt.":     { price: 45, count: 0, unit: "43g" } } },

                        

                /*Amul*/{ id: 2008, name: "Amul Dark Chocolate",                                            image: "chdc.jpg",              cat: "chocolates",                subcat: "Amul",             selectedVariant: "Wgt.",        variants: { "Wgt.":     { price: 200, count: 0, unit: "150g" } } },
                        { id: 2009, name: "Amul Smooth & Creamy Milk",                                      image: "camulsc.jpg",           cat: "chocolates",                subcat: "Amul",             selectedVariant: "Wgt.",        variants: { "Wgt.":     { price: 160, count: 0, unit: "125g" } } },
                        { id: 2010, name: "Amul Belgian Smooth and Creamy Milk",                            image: "camulbc.jpg",           cat: "chocolates",                subcat: "Amul",             selectedVariant: "Wgt.",        variants: { "Wgt.":     { price: 200, count: 0, unit: "150g" } } },
                        { id: 2011, name: "Amul Velvett",                                                   image: "chvelvett.jpg",         cat: "chocolates",                subcat: "Amul",             selectedVariant: "Wgt.",        variants: { "Wgt.":     { price: 50, count: 0, unit: "35g" } } },

        /*Hershey's*/   { id: 2012, name: "Hershey's Kisses Milk Pack",                                     image: "ckissesmc.jpg",         cat: "chocolates",                subcat: "Hershey's",        selectedVariant: "Wgt.",        variants: { "Wgt.":     { price: 55, count: 0, unit: "36g" } } },
                        { id: 2013, name: "Hershey's Kisses Almonds Milk Pack",                             image: "ckissesa.jpg",          cat: "chocolates",                subcat: "Hershey's",        selectedVariant: "Wgt.",        variants: { "Wgt.":     { price: 60, count: 0, unit: "34g" } } },
                        { id: 2014, name: "Hershey's Kisses Cookies n Creme Assorted",                      image: "ckissescnc.jpg",        cat: "chocolates",                subcat: "Hershey's",        selectedVariant: "Wgt.",        variants: { "Wgt.":     { price: 60, count: 0, unit: "34g" } } },

             /*Nestle*/ { id: 2015, name: "Nestle Milkybar Creamy Milky Treat",                             image: "cnestlemb.jpg",         cat: "chocolates",                subcat: "Nestle",           selectedVariant: "Wgt.",        variants: { "Wgt.":     { price: 40, count: 0, unit: "47g" } } },
                        { id: 2016, name: "Nestle Kitkat",                                                  image: "chkitkat.jpg",          cat: "chocolates",                subcat: "Nestle",           selectedVariant: "Wgt.",        variants: { "Wgt.":     { price: 30, count: 0, unit: "38g" } } }, 
                        { id: 2017, name: "Nestle Munch Max Nuts",                                          image: "cnestlemm.jpg",         cat: "chocolates",                subcat: "Nestle",           selectedVariant: "Wgt.",        variants: { "Wgt.":     { price: 30, count: 0, unit: "37g" } } }, 

             

                /*Kids*/{ id: 2018, name: "Kinder joy",                                                     image: "chkinderjoy.jpg",       cat: "chocolates",                subcat: "Kids",             selectedVariant: "Wgt.",        variants: { "Wgt.":     { price: 45, count: 0, unit: "20g" } } },
                        { id: 2019, name: "Lotte Choco Pie Cake",                                           image: "chkinderjoy.jpg",       cat: "chocolates",                subcat: "Kids",             selectedVariant: "Qty.",        variants: { "Qty.":     { price: 10, count: 0, unit: "1pc" } } },
                        { id: 2020, name: "Twix Cookie Caramel Filled Bar",                                 image: "ctwix.jpg",             cat: "chocolates",                subcat: "Kids",             selectedVariant: "Qty.",        variants: { "Qty.":     { price: 100, count: 0, unit: "50g" } } },
                        { id: 2021, name: "Snickers Peanut Nougat & Caramel",                               image: "csnickers.jpg",         cat: "chocolates",                subcat: "Kids",             selectedVariant: "Wgt.",        variants: { "Wgt.":     { price: 30, count: 0, unit: "38.5g" } } },
                        
                        
                
/* Biscuits */

             /*sunfest*/{ id: 3001, name: "Dark Fantasy Choco Fills",                                       image: "bidf.jpg",              cat: "biscuits",                  subcat: "Sunfeast",          selectedVariant: "L",           variants: { "L":        { price: 35, count: 0, unit: "69g" } } },
                        { id: 3002, name: "Dark Fantasy Choco Nut Fills",                                   image: "bdfcnf.jpg",            cat: "biscuits",                  subcat: "Sunfeast",          selectedVariant: "L",           variants: { "L":        { price: 35, count: 0, unit: "69g" } } },
                        { id: 3003, name: "Dark Fantasy Dual Fills",                                        image: "bdfdf.jpg",             cat: "biscuits",                  subcat: "Sunfeast",          selectedVariant: "L",           variants: { "L":        { price: 45, count: 0, unit: "69g" } } },
                        { id: 3004, name: "Dark Fantasy Coffee Fills",                                      image: "bdfcf.jpg",             cat: "biscuits",                  subcat: "Sunfeast",          selectedVariant: "L",           variants: { "L":        { price: 40, count: 0, unit: "75g" } } },

               /*Parle*/{ id: 3005, name: "Hide & Seek Coffee Chocolate",                                   image: "bihideandseekc.jpg",    cat: "biscuits",                  subcat: "Parle",              selectedVariant: "L",           variants: { "L":        { price: 30, count: 0, unit: "100g" } } },
                        { id: 3008, name: "Parle-G",                                                        image: "biparleg.jpg",          cat: "biscuits",                  subcat: "Parle",              selectedVariant: "L",           variants: { "L":        { price: 80, count: 0, unit: "800g" } } },
                        { id: 3006, name: "Hide & Seek",                                                    image: "bihideandseek.jpg",     cat: "biscuits",                  subcat: "Parle",             selectedVariant: "L",           variants: { "L":        { price: 30, count: 0, unit: "100g" } } },
                        { id: 3007, name: "Oreo",                                                           image: "bioreo.jpg",            cat: "biscuits",                  subcat: "Parle",             selectedVariant: "L",           variants: { "L":        { price: 40, count: 0, unit: "125g" } } },  
                        { id: 3009, name: "Cheese Craker",                                                  image: "bipriyagoldck.jpg",     cat: "biscuits",                  subcat: "Parle",              selectedVariant: "L",           variants: { "L":        { price: 25, count: 0, unit: "136g" } } },

           /*Britannia*/{ id: 3010, name: "Good Day Cashew Almond",                                         image: "bigooddayc.jpg",        cat: "biscuits",                  subcat: "Britannia",          selectedVariant: "L",           variants: { "L":        { price: 40, count: 0, unit: "200g" } } },
                        { id: 3012, name: "Good Day Pista Badam",                                           image: "bigooddayp.jpg",        cat: "biscuits",                  subcat: "Britannia",          selectedVariant: "L",           variants: { "L":        { price: 50, count: 0, unit: "200g" } } },
                        { id: 3013, name: "Good Day ChocoChip",                                             image: "bigooddaychoco.jpg",    cat: "biscuits",                  subcat: "Britannia",          selectedVariant: "L",           variants: { "L":        { price: 100, count: 0, unit: "444g" } } },
                        { id: 3014, name: "Good Day Butter",                                                image: "bigooddaybutter.jpg",   cat: "biscuits",                  subcat: "Britannia",          selectedVariant: "L",           variants: { "L":        { price: 40, count: 0, unit: "200g" } } },
                        { id: 3015, name: "Good Day Fruit & Nut Cookies",                                   image: "bigooddayfn.jpg",       cat: "biscuits",                  subcat: "Britannia",          selectedVariant: "L",           variants: { "L":        { price: 100, count: 0, unit: "450g" } } },
                        { id: 3016, name: "Britannia Bourbon ",                                             image: "bibritanniab.jpg",      cat: "biscuits",                  subcat: "Britannia",          selectedVariant: "L",           variants: { "L":        { price: 35, count: 0, unit: "100g" } } },
                        { id: 3017, name: "Britannia Nice Time Coconut Biscuit",                            image: "bibritanniant.jpg",     cat: "biscuits",                  subcat: "Britannia",          selectedVariant: "L",           variants: { "L":        { price: 25, count: 0, unit: "136g" } } },
                        { id: 2018, name: "Britannia Croissant",                                            image: "ccroissant.jpg",        cat: "biscuits",                  subcat: "Britannia",          selectedVariant: "L",           variants: { "L":        { price: 75, count: 0, unit: "240g" } } },
                        { id: 3019, name: "Britannia Marigold",                                             image: "bimari.jpg",            cat: "biscuits",                  subcat: "Britannia",          selectedVariant: "L",           variants: { "L":        { price: 40, count: 0, unit: "208g" } } },
                        { id: 3020, name: "Britannia Milk Bikis",                                           image: "bimb.jpg",              cat: "biscuits",                  subcat: "Britannia",          selectedVariant: "L",           variants: { "L":        { price: 70, count: 0, unit: "500g" } }  },
                
/* Snacks */
             /*Kurkure*/{ id: 4001, name: "Kurkure Chutney",                                                image: "skurkurec.jpg",         cat: "snacks",                    subcat: "Kurkure",            selectedVariant: "S",           variants: { "S":        { price: 10, count: 0, unit: "40g" }, "L": { price: 25, count: 0, unit: "75g" } } },
                        { id: 4002, name: "Kurkure Chilli",                                                 image: "skurkurecc.jpg",        cat: "snacks",                    subcat: "Kurkure",            selectedVariant: "S",           variants: { "S":        { price: 10, count: 0, unit: "40g" }, "L": { price: 25, count: 0, unit: "75g" } } },
                        { id: 4003, name: "Kurkure Masala",                                                 image: "skurkurem.jpg",         cat: "snacks",                    subcat: "Kurkure",            selectedVariant: "S",           variants: { "S":        { price: 10, count: 0, unit: "40g" }, "L": { price: 25, count: 0, unit: "75g" } } },
                        { id: 4004, name: "Kurkure Puffcorn",                                               image: "skurkurep.jpg",         cat: "snacks",                    subcat: "Kurkure",            selectedVariant: "S",           variants: { "S":        { price: 10, count: 0, unit: "40g" }, "L": { price: 25, count: 0, unit: "75g" } } },
                        { id: 4005, name: "Kurkure Schezwan Chutney",                                       image: "skurkuresc.jpg",        cat: "snacks",                    subcat: "Kurkure",            selectedVariant: "S",           variants: { "S":        { price: 10, count: 0, unit: "40g" }, "L": { price: 25, count: 0, unit: "75g" } } },

                /*Lays*/{ id: 4006, name: "Lay's India's M",                                                image: "slaysb.jpg",            cat: "snacks",                    subcat: "Lays",               selectedVariant: "S",           variants: { "S":        { price: 10, count: 0, unit: "75g" }, "L": { price: 25, count: 0, unit: "200g" } } },
                        { id: 4007, name: "Lay's American",                                                 image: "slaysg.jpg",            cat: "snacks",                    subcat: "Lays",               selectedVariant: "S",           variants: { "S":        { price: 10, count: 0, unit: "75g" }, "L": { price: 25, count: 0, unit: "200g" } } },
                        { id: 4008, name: "Lay's Classic",                                                  image: "slaysy.jpg",            cat: "snacks",                    subcat: "Lays",               selectedVariant: "S",           variants: { "S":        { price: 10, count: 0, unit: "75g" }, "L": { price: 25, count: 0, unit: "200g" } } },
                        { id: 4009, name: "Lay's Chile Limon",                                              image: "slaysc.jpg",            cat: "snacks",                    subcat: "Lays",               selectedVariant: "S",           variants: { "S":        { price: 10, count: 0, unit: "75g" }, "L": { price: 25, count: 0, unit: "200g" } } },
                        { id: 4010, name: "Lay's Crispz",                                                   image: "slayscr.jpg",           cat: "snacks",                    subcat: "Lays",               selectedVariant: "S",           variants: { "S":        { price: 10, count: 0, unit: "75g" }, "L": { price: 25, count: 0, unit: "200g" } } },
                        { id: 4011, name: "Lay's Spanish Tomato Tango",                                     image: "slayss.jpg",            cat: "snacks",                    subcat: "Lays",               selectedVariant: "S",           variants: { "S":        { price: 10, count: 0, unit: "75g" }, "L": { price: 25, count: 0, unit: "200g" } } },
                        { id: 4012, name: "Lay's Sizzlin Hot",                                              image: "slayssh.jpg",           cat: "snacks",                    subcat: "Lays",               selectedVariant: "S",           variants: { "S":        { price: 10, count: 0, unit: "75g" }, "L": { price: 25, count: 0, unit: "200g" } } },
                        { id: 4013, name: "Lay's Hot n sweet chilli",                                       image: "slaysw.jpg",            cat: "snacks",                    subcat: "Lays",               selectedVariant: "S",           variants: { "S":        { price: 10, count: 0, unit: "75g" }, "L": { price: 25, count: 0, unit: "200g" } } },

                        
            /*Pingles */{ id: 4014, name: "Pringles Sour Cream & Onion Potato",                             image: "spinglessc.jpg",        cat: "snacks",                    subcat: "Pingles",            selectedVariant: "L",           variants: { "L":        { price: 136, count: 0, unit: "141g" } } },
                        { id: 4015, name: "Pringles Original Potato Chips",                                 image: "spingleo.jpg",          cat: "snacks",                    subcat: "Pingles",            selectedVariant: "L",           variants: { "L":        { price: 110, count: 0, unit: "107g" } } },
                        { id: 4016, name: "Pringles Pizza Flavoured Potato Chips",                          image: "spinglep.jpg",          cat: "snacks",                    subcat: "Pingles",            selectedVariant: "L",           variants: { "L":        { price: 101, count: 0, unit: "102g" } } },
                        
             /*Namkeen*/{ id: 4017, name: "Haldirams Punjabi Tadka",                                        image: "spunjabi.jpg",          cat: "snacks",                    subcat: "Haldiram's",          selectedVariant: "S",           variants: { "S":        { price: 20, count: 0, unit: "75g" }, "L": { price: 55, count: 0, unit: "210g" } } },
                        { id: 4018, name: "Haldirams Bhujia",                                               image: "sbhujia.jpg",           cat: "snacks",                    subcat: "Haldiram's",          selectedVariant: "S",           variants: { "S":        { price: 20, count: 0, unit: "75g" }, "L": { price: 60, count: 0, unit: "200g" } } },
                        { id: 4019, name: "Haldirams Salted Peanuts",                                       image: "ssalted.jpg",           cat: "snacks",                    subcat: "Haldiram's",          selectedVariant: "S",           variants: { "S":        { price: 20, count: 0, unit: "75g" }, "L": { price: 55, count: 0, unit: "200g" } } },
                        { id: 4020, name: "Haldirams Gup Shup",                                             image: "sgup.jpg",              cat: "snacks",                    subcat: "Haldiram's",          selectedVariant: "S",           variants: { "S":        { price: 20, count: 0, unit: "75g" }, "L": { price: 55, count: 0, unit: "200g" } } },
                        { id: 4021, name: "Haldirams Moong Dal",                                            image: "shaldirammd.jpg",       cat: "snacks",                    subcat: "Haldiram's",          selectedVariant: "S",           variants: { "S":        { price: 20, count: 0, unit: "75g" }, "L": { price: 60, count: 0, unit: "200g" } } },
                        { id: 4022, name: "Haldirams Lite Mixture",                                         image: "shaldiramlm.jpg",       cat: "snacks",                    subcat: "Haldiram's",          selectedVariant: "S",           variants: { "S":        { price: 20, count: 0, unit: "75g" }, "L": { price: 40, count: 0, unit: "150g" } } },
                
/* Personal */
                /*Hair*/{ id: 5001, name: "Comb 15cm",                                                      image: "pccomb.jpg",            cat: "personal",                  subcat: "Hair",                selectedVariant: "Size",        variants: { "Size":     { price: 50, count: 0, unit: "20cm" } } },
                        { id: 5002, name: "Almond Oil",                                                     image: "pcalmond.jpg",          cat: "personal",                  subcat: "Hair",                selectedVariant: "Bottle",      variants: { "Bottle":   { price: 85, count: 0, unit: "95ml" } } },
                        { id: 5003, name: "Head and Shoulders Anti Dandruff",                               image: "pcshampoo.jpg",         cat: "personal",                  subcat: "Hair",                selectedVariant: "Bottle",      variants: { "Bottle":   { price: 181, count: 0, unit: "180ml" } } },
                        

                /*Body*/{ id: 5004, name: "Pears Pack of 3",                                                image: "pcpears.jpg",           cat: "personal",                  subcat: "Body",               selectedVariant: "Piece",       variants: { "Piece":    { price: 200, count: 0, unit: "1pk" } } },
                        { id: 5005, name: "Lux Black Orchid & Juniper",                                     image: "pcbodywash.jpg",        cat: "personal",                  subcat: "Body",               selectedVariant: "Piece",       variants: { "Piece":    { price: 90, count: 0, unit: "90ml" } } },
                        { id: 5006, name: "Bath Loofah",                                                    image: "pcl.jpg",               cat: "personal",                  subcat: "Body",               selectedVariant: "Piece",       variants: { "Piece":    { price: 100, count: 0, unit: "1pc" } } },

                /*Face*/{ id: 5007, name: "Cetaphil",                                                       image: "pccleanser.jpg",        cat: "personal",                  subcat: "Face",               selectedVariant: "Piece",       variants: { "Piece":    { price: 405, count: 0, unit: "118ml" } } },
                        { id: 5008, name: "Minimilist Vitamin b5 10%",                                      image: "pcmoist.jpg",           cat: "personal",                  subcat: "Face",               selectedVariant: "Piece",       variants: { "Piece":    { price: 350, count: 0, unit: "50g" } } },
                        { id: 5009, name: "Himalaya Lip Balm",                                              image: "pclb.jpg",              cat: "personal",                  subcat: "Face",               selectedVariant: "Piece",       variants: { "Piece":    { price: 350, count: 0, unit: "50g" } } },


            /*Grooming*/{ id: 5010, name: "Scissors 2 X 4.25inch",                                          image: "pcscissors.jpg",        cat: "personal",                  subcat: "Grooming",           selectedVariant: "Size",        variants: { "Size":     { price: 50, count: 0, unit: "2x4inch" } } },
                        { id: 5011, name: "Handkerchief pack of 3",                                         image: "pchandkerchief.jpg",    cat: "personal",                  subcat: "Grooming",           selectedVariant: "Piece",       variants: { "Piece":    { price: 170, count: 0, unit: "1pk" } } },
                        { id: 5012, name: "Gillette Mac 3 Razor",                                           image: "pcgillette.jpg",        cat: "personal",                  subcat: "Grooming",           selectedVariant: "Piece",       variants: { "Piece":    { price: 192, count: 0, unit: "1pc" } } },
                        { id: 5013,  name: "Nail Clipper",                                                   image: "pcnc.jpg",              cat: "personal",                  subcat: "Grooming",           selectedVariant: "Piece",       variants: { "Piece":    { price: 80, count: 0, unit: "1pc" } } },


              /*Dental*/{ id: 5014, name: "Colgate",                                                        image: "pccolgate.jpg",         cat: "personal",                  subcat: "Dental",             selectedVariant: "Tube",        variants: { "Tube":     { price: 120, count: 0, unit: "180ml" } } },
                        { id: 5015, name: "Oral-B Pro Clean",                                               image: "pcoralb.jpg",           cat: "personal",                  subcat: "Dental",             selectedVariant: "Piece",       variants: { "Piece":    { price: 50, count: 0, unit: "1pc" } } },

/*Cleaning*/
                /*cloths*/{ id: 6001, name: "Ariel Power Gel Front Load Liquid Detergent",                   image: "clarielb.jpg",         cat: "cleaningessentials",        subcat: "Clothes",            selectedVariant: "Qty",        variants: { "Qty":     { price: 215, count: 0, unit: "950ml" } } },
                          { id: 6002, name: "Comfort After Wash Fabric Conditioner -Lily Fresh",             image: "clcomforlf.jpg",       cat: "cleaningessentials",        subcat: "Clothes",            selectedVariant: "Qty",        variants: { "Qty":     { price: 235, count: 0, unit: "860ml" } } },
                          { id: 6003, name: "Comfort After Wash Fabric Conditioner -Morning Fresh",          image: "clcomfortmf.jpg",      cat: "cleaningessentials",        subcat: "Clothes",            selectedVariant: "Qty",        variants: { "Qty":     { price: 235, count: 0, unit: "860ml" } } },

    /*Toilet & Bathroom*/ { id: 6004, name: "Harpic Advanced Disinfectant Toilet Cleaner)",                  image: "clharpic.jpg",         cat: "cleaningessentials",        subcat: "Toilet & Bathroom",  selectedVariant: "Qty",        variants: { "Qty":     { price: 235, count: 0, unit: "860ml" } } },
                          { id: 6005, name: "Feather's 2 Ply Toilet Tissue Roll Ultra-soft",                 image: "cltp.jpg",             cat: "cleaningessentials",        subcat: "Toilet & Bathroom",  selectedVariant: "Qty",        variants: { "Qty":     { price: 450, count: 0, unit: "10pc" } } },

        /*Room Freshners*/{ id: 6006, name: "Odonil Lavender Mist Room Freshener (Lavender)",                image: "clodonill.jpg",        cat: "cleaningessentials",        subcat: "Room Freshners",     selectedVariant: "Qty",        variants: { "Qty":     { price: 170, count: 0, unit: "220ml" } } },
        
      /*Surface Cleaners*/{ id: 6007, name: "Colin Glass Cleaner ",                                          image: "clcolin.jpg",        cat: "cleaningessentials",        subcat: "Surface Cleaners",   selectedVariant: "Qty",        variants: { "Qty":     { price: 120, count: 0, unit: "500ml" } } },
                          { id: 6008, name: "Lizol Disinfectant Surface & Floor Cleaner ",                   image: "cllizol.jpg",        cat: "cleaningessentials",        subcat: "Surface Cleaners",   selectedVariant: "Qty",        variants: { "Qty":     { price: 260, count: 0, unit: "1L" } } },
                          { id: 6009, name: "Feather's Premium Paper Napkin(ply 2) ",                        image: "clfeathern.jpg",       cat: "cleaningessentials",        subcat: "Surface Cleaners",   selectedVariant: "Qty",        variants: { "Qty":     { price: 90, count: 0, unit: "105gm" } } },
                        
    ];

    let recentAdditions = [];
    let activeCategory = "";
    let userCoords = null;
    const duration = 1000;

    // --- SPLASH SCREEN LOGIC ---
    if (window.innerWidth < 768) {
        if (splash) {
            body.classList.add('no-scroll');
            setTimeout(() => {
                splash.classList.add('fade-out');
                body.classList.remove('no-scroll');
                setTimeout(() => { splash.remove(); }, 1000);
            }, 3300);
        }
    } else {
        if (splash) splash.remove();
    }

    // --- NAVIGATION & HISTORY ---
    window.addEventListener('popstate', function (event) {
        const isSliderOpen = productSlider.classList.contains('active');
        const isCartOpen = orderSidebar.classList.contains('active');

        if (isSliderOpen || isCartOpen) {
            productSlider.classList.remove('active');
            orderSidebar.classList.remove('active');
        } else {
            if (sessionStorage.getItem('backPressedOnce')) {
                sessionStorage.removeItem('backPressedOnce');
                history.back();
            } else {
                sessionStorage.setItem('backPressedOnce', 'true');
                alert("Press the back button again to exit.");
                setTimeout(() => sessionStorage.removeItem('backPressedOnce'), 2000);
                history.pushState({ page: 'grid' }, document.title, location.href);
            }
        }
    });
    if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    toggleSwitch.checked = true; // This moves the slider to the right
}

    // --- UI RENDERING ---
    function renderCollections() {
        collectionGrid.innerHTML = collections.map(c => `
            <div class="collection-card" data-id="${c.id}" data-name="${c.name}">
                <div class="image-preview-box">
                    ${c.previews.map(img => `<div class="image-preview-card"><img src="${img}" alt="preview"></div>`).join('')}
                </div>
                <h3>${c.name}</h3>
            </div>
        `).join('');
    }

    function startCounters() {
    let startTime = null;
    const duration = 1500; // Ensure duration is defined

    function update(currentTime) {
        if (!startTime) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const current = Math.floor(progress * target);
            counter.innerText = `${current}+`;
        });

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            counters.forEach(counter => {
                counter.innerText = `${counter.getAttribute('data-target')}+`;
            });
        }
    }
    requestAnimationFrame(update);
}

// --- ADD THE INTERSECTION OBSERVER HERE ---
const observerOptions = {
    threshold: 0.1 // Trigger when 50% of the counter section is visible
};

const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            startCounters(); // Start the animation
            observer.unobserve(entry.target); // Stop observing after it runs once
        }
    });
}, observerOptions);

// Select the container of your counters to observe
const statsSection = document.querySelector('.stats-container'); 
if (statsSection) {
    counterObserver.observe(statsSection);
}

    function openCollection(catId, catName) {
        activeCategory = catId;
        const sliderTitle = document.getElementById('slider-title');
        if (sliderTitle) sliderTitle.innerText = catName;
        
        // --- ADD THIS LINE BELOW ---
        productSlider.scrollTop = 0; 
        
        renderProducts(catId);
        orderSidebar.classList.remove('active');
        productSlider.classList.add('active');
        updateSidebar();
        history.pushState({ page: 'slider' }, document.title, location.href);
    }

    function renderProducts(catId) {
        const filtered = products.filter(p => p.cat === catId);
        if (filtered.length === 0) {
            productGrid.innerHTML = `<p class="empty-msg">Empty for now.</p>`;
            pgroupslider.innerHTML = "";
            return;
        }

        const subcatData = [];
        filtered.forEach(p => {
            if (!subcatData.find(s => s.name === p.subcat)) {
                subcatData.push({ name: p.subcat, image: p.image });
            }
        });

        subcatData.sort((a, b) => a.name.localeCompare(b.name));

        pgroupslider.innerHTML = subcatData.map(sub => `
            <div class="subcat-nav-item" data-target="sub-${sub.name.replace(/\s+/g, '')}">
                <img src="${sub.image}" alt="${sub.name}">
                <span>${sub.name}</span>
            </div>
        `).join('');

        const sortedProducts = [...filtered].sort((a, b) => a.subcat.localeCompare(b.subcat));
        const usedSubcats = new Set();

        productGrid.innerHTML = sortedProducts.map(p => {
            const currentVar = p.variants[p.selectedVariant];
            const cleanSubName = p.subcat.replace(/\s+/g, '');
            let anchorIdAttr = "";
            if (!usedSubcats.has(cleanSubName)) {
                anchorIdAttr = `id="sub-${cleanSubName}"`;
                usedSubcats.add(cleanSubName);
            }

            return `
                <div class="card" ${anchorIdAttr} data-subcat="${cleanSubName}" data-prod-id="${p.id}">
                    <div class="img-container">
                        <img src="${p.image}" class="iimg" alt="${p.name}">
                    </div>
                    <h4>${p.name}</h4>
                    <div class="variant-selector">
                        ${Object.keys(p.variants).map(v => `
                            <button class="variant-btn ${p.selectedVariant === v ? 'active' : ''}" 
                                data-product-id="${p.id}" data-variant="${v}">
                                <span>${v}</span>
                                <span class="unit-text">${p.variants[v].unit}</span>
                            </button>
                        `).join('')}
                    </div>
                    <p class="price-tag">Rs ${currentVar.price}</p>
                    <div class="controls">
                        <button class="add-btn ${currentVar.count > 0 ? 'hidden' : ''}" data-product-id="${p.id}">Add</button>
                        <div class="qty-controls ${currentVar.count > 0 ? '' : 'hidden'}">
                            <button class="qty-btn" data-product-id="${p.id}" data-change="-1">-</button>
                            <span>${currentVar.count}</span>
                            <button class="qty-btn" data-product-id="${p.id}" data-change="1">+</button>
                        </div>
                    </div>
                </div>`;
        }).join('');
    }

    // --- SCROLL & SYNC ---
    pgroupslider.addEventListener('click', (e) => {
        const item = e.target.closest('.subcat-nav-item');
        if (item) {
            item.classList.add('subcat-active-highlight');
            setTimeout(() => item.classList.remove('subcat-active-highlight'), 1000);

            const targetId = item.getAttribute('data-target');
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerOffset = 85; 
                const elementPosition = targetElement.offsetTop;
                productSlider.scrollTo({
                    top: elementPosition - headerOffset,
                    behavior: "smooth"
                });
            }
        }
    });
    
 

    productSlider.addEventListener('scroll', () => {
        const productScrollTotal = productSlider.scrollHeight - productSlider.clientHeight;
        if (productScrollTotal > 0) {
            const scrollPct = productSlider.scrollTop / productScrollTotal;
            const sliderScrollTotal = pgroupslider.scrollHeight - pgroupslider.clientHeight;
            pgroupslider.scrollTop = scrollPct * sliderScrollTotal;
        }

        const sections = productGrid.querySelectorAll('.card[id^="sub-"]');
        let currentSectionId = "";
        sections.forEach(sec => {
            const rect = sec.getBoundingClientRect();
            if (rect.top <= productSlider.getBoundingClientRect().top + 100) {
                currentSectionId = sec.id;
            }
        });

        document.querySelectorAll('.subcat-nav-item').forEach(nav => {
            nav.classList.toggle('active', nav.getAttribute('data-target') === currentSectionId);
        });
    });

    // --- UTILITIES ---
    function updateDate() {
        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();
        if (dateElement) dateElement.textContent = `📅 ${day}/${month}/${year}`;
    }

    function updateCount() {
        const randomPeople = Math.floor(Math.random() * 10) + 1;
        if (countElement) countElement.textContent = randomPeople;
    }

    function updateSidebar() {
        let itemsTotal = 0, totalItems = 0;
        let html = "";
        products.forEach(p => {
            Object.keys(p.variants).forEach(vName => {
                const v = p.variants[vName];
                if (v.count > 0) {
                    itemsTotal += (v.count * v.price);
                    totalItems += v.count;
                    html += `
                        <div class="order-item-detail">
                            <img src="${p.image}" alt="item">
                            <div>
                                <strong>${p.name} (${v.unit})</strong><br>
                                Rs ${v.price}
                                <div class="sidebar-controls">
                                    <button class="side-qty-btn" data-id="${p.id}" data-var="${vName}" data-chg="-1">-</button>
                                    <span>${v.count}</span>
                                    <button class="side-qty-btn" data-id="${p.id}" data-var="${vName}" data-chg="1">+</button>
                                </div>
                            </div>
                        </div>`;
                }
            });
        });

        let delivery = itemsTotal > 0 ? (itemsTotal < 300 ? 50 : (itemsTotal <= 1000 ? 100 : 200)) : 0;
        document.getElementById('sidebar-content').innerHTML = html || "<p>Cart is empty</p>";
        document.getElementById('subtotal-val').innerText = itemsTotal;
        document.getElementById('delivery-val').innerText = delivery;
        document.getElementById('total-price').innerText = itemsTotal + delivery;
        const cartCount = document.getElementById('cart-count');
        if (cartCount) cartCount.innerText = totalItems;
        
        document.body.style.marginBottom = totalItems > 0 ? "7rem" : "0";

        if(totalItems > 0 && !orderSidebar.classList.contains('active')) {
            cartPopup.classList.remove('hidden');
            document.getElementById('popup-count').innerText = totalItems;
            document.getElementById('popup-images-container').innerHTML = [...new Set(recentAdditions)].slice(0, 5).map(img => `<img src="${img}" alt="recent">`).join('');
        } else { 
            cartPopup.classList.add('hidden'); 
        }
    }

    function openAndHighlight(productId, catId) {
        const col = collections.find(c => c.id === catId);
        openCollection(catId, col.name);
        setTimeout(() => {
            const el = document.querySelector(`[data-prod-id="${productId}"]`);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                el.classList.add('highlight-search');
                setTimeout(() => el.classList.remove('highlight-search'), 1000);
            }
        }, 400);
    }

    // --- HANDLERS ---
    collectionGrid.addEventListener('click', (e) => {
        const card = e.target.closest('.collection-card');
        if (card) openCollection(card.dataset.id, card.dataset.name);
    });

    productGrid.addEventListener('click', (e) => {
    const target = e.target;
    if (target.closest('.variant-btn')) {
        const btn = target.closest('.variant-btn');
        const p = products.find(prod => prod.id == btn.dataset.productId);
        p.selectedVariant = btn.dataset.variant;
        renderProducts(activeCategory);
    }

    if (target.classList.contains('add-btn') || target.classList.contains('qty-btn')) {
        const id = target.dataset.productId;
        const amount = parseInt(target.dataset.change || 1);
        const p = products.find(prod => prod.id == id);
        const v = p.variants[p.selectedVariant];
        
        v.count += amount;
        if (v.count < 0) v.count = 0;

        if (amount > 0) {
            // Add image to the start if increasing
            recentAdditions.unshift(p.image);
        } else if (amount < 0) {
            // Remove one instance of this image if decreasing
            const index = recentAdditions.indexOf(p.image);
            if (index > -1) {
                recentAdditions.splice(index, 1);
            }
        }

        // Keep the preview list clean (max 4-5 items)
        if (recentAdditions.length > 5) recentAdditions.pop();

        renderProducts(activeCategory);
        updateSidebar();
    }
});

   orderSidebar.addEventListener('click', (e) => {
    if (e.target.classList.contains('side-qty-btn')) {
        const btn = e.target;
        const p = products.find(prod => prod.id == btn.dataset.id);
        const change = parseInt(btn.dataset.chg);
        
        p.variants[btn.dataset.var].count += change;
        if (p.variants[btn.dataset.var].count < 0) p.variants[btn.dataset.var].count = 0;

        // Sync the recentAdditions images
        if (change < 0) {
            const index = recentAdditions.indexOf(p.image);
            if (index > -1) recentAdditions.splice(index, 1);
        } else {
            recentAdditions.unshift(p.image);
        }

        updateSidebar();
        if(activeCategory === p.cat) renderProducts(p.cat);
    }
});

    const toggleSidebar = () => {
        const opening = !orderSidebar.classList.contains('active');
        productSlider.classList.remove('active');
        orderSidebar.classList.toggle('active');
        if (opening) history.pushState({ page: 'cart' }, document.title, location.href);
        updateSidebar();
    };

    document.getElementById('cart-trigger').addEventListener('click', toggleSidebar);
    document.getElementById('cart-popup').addEventListener('click', toggleSidebar);
    document.getElementById('close-sidebar').addEventListener('click', () => history.back());
    document.getElementById('close-slider').addEventListener('click', () => history.back());

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase().trim();
        clearSearch.classList.toggle('hidden', !query);
        if (!query) { searchSuggestions.style.display = "none"; return; }
        const matches = products.filter(p => p.name.toLowerCase().includes(query)).slice(0, 6);
        if (matches.length > 0) {
            searchSuggestions.innerHTML = matches.map(p => `
                <div class="suggestion-item" data-id="${p.id}" data-cat="${p.cat}" data-name="${p.name}">
                    <img src="${p.image}" alt="suggest">
                    <span>${p.name}</span>
                </div>
            `).join('');
            searchSuggestions.style.display = "block";
        } else { searchSuggestions.style.display = "none"; }
    });
    // --- CLICK HANDLER FOR SEARCH SUGGESTIONS ---
    searchSuggestions.addEventListener('click', (e) => {
        const item = e.target.closest('.suggestion-item');
        if (item) {
            const productId = item.dataset.id;
            const catId = item.dataset.cat;
            
            // 1. Execute your existing open and highlight logic
            openAndHighlight(productId, catId);
            
            // 2. Clear the search and hide suggestions
            searchInput.value = "";
            searchSuggestions.style.display = "none";
            clearSearch.classList.add('hidden');
        }
    });
    clearSearch.addEventListener('click', () => {
    // 1. Empty the input field
    searchInput.value = "";
    
    // 2. Hide the suggestions box
    searchSuggestions.style.display = "none";
    
    // 3. Hide the clear button itself
    clearSearch.classList.add('hidden');
    
    // 4. Return focus to the input (optional but better UX)
    searchInput.focus();
});

    document.getElementById('location-btn').addEventListener('click', async () => {
        const display = document.getElementById('location-display');
        if (navigator.geolocation) {
            display.innerText = "Locating...";
            navigator.geolocation.getCurrentPosition(async (pos) => {
                userCoords = { lat: pos.coords.latitude, lon: pos.coords.longitude };
                try {
                    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`);
                    const data = await res.json();
                    custAddressInput.value = data.display_name || "Location Tagged";
                    display.innerText = `✅ Location Tagged`;
                } catch (e) { 
                    custAddressInput.value = `Lat: ${userCoords.lat}, Lon: ${userCoords.lon}`;
                    display.innerText = "✅ Coordinates Captured"; 
                }
            }, () => { display.innerText = "❌ Access Denied"; });
        }
    });

    whatsappBtn.addEventListener('click', () => {
        const name = custNameInput.value;
        const address = custAddressInput.value;
        const subtotal = document.getElementById('subtotal-val').innerText;
        const delivery = document.getElementById('delivery-val').innerText;
        const total = document.getElementById('total-price').innerText;
        
        if (total == "0") { alert("Cart is empty!"); return; }
        if (!name || !address) { alert("Please enter Name and Address."); return; }
        
        const now = new Date();
        const dateStr = now.toLocaleDateString('en-GB'); 
        const timeStr = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
        const locationLink = userCoords ? `https://www.google.com/maps?q=${userCoords.lat},${userCoords.lon}` : `(Location not tagged)`;
        const divider = "--------------------------%0A";
        
        let msg = `🛍️ *NEW ORDER - WINK IT*%0A`;
        msg += divider;
        msg += `📅 Date: ${dateStr} | ${timeStr}%0A`;
        msg += `👤 Name: ${name}%0A📍 Address: ${address}%0A🗺️ Location: ${locationLink}%0A%0A`;
        msg += `🛒 *ITEMS:*%0A`;
        
        let itemIndex = 1;
        products.forEach(p => {
            Object.keys(p.variants).forEach(vName => {
                const v = p.variants[vName];
                if (v.count > 0) {
                    msg += `${itemIndex}. ${p.name} (${v.unit}) x${v.count} - ₹${v.price * v.count}%0A`;
                    itemIndex++; 
                }
            });
        });

        msg += divider;
        msg += `Subtotal: ₹${subtotal}%0A`;
        msg += `Delivery: ₹${delivery}%0A`;
        msg += `*TOTAL AMOUNT: ₹${total}*%0A`; 
        msg += divider;
        msg += `Cash on Delivery, our delivery partner will call you shortly.`;
        
        window.location.href = `https://api.whatsapp.com/send?phone=917983427187&text=${msg}`;
    });

    checkbox.addEventListener('change', () => {
  document.body.classList.toggle('dark-mode');
    });

    // --- STARTUP ---
    updateCount();
    updateDate();
    setInterval(updateCount, 60000);
    products.sort((a, b) => a.name.localeCompare(b.name));
    renderCollections();
    startCounters();
    if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    toggleSwitch.checked = true; 
}
});