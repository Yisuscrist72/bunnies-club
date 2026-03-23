import type { Product } from "@/components/molecules/ShopCard";

/**
 * 🛍️ CATÁLOGO DE PRODUCTOS DE LA TIENDA
 * ──────────────────────────────────────
 * Para añadir un producto nuevo:
 * 1. Pon la imagen en: public/images/shop/
 * 2. Añade un nuevo objeto al array siguiendo la plantilla de abajo
 * 3. Si tiene 1 tienda → botón "COMPRAR" directo
 *    Si tiene 2+ tiendas → botón "VER TIENDAS" con modal
 */
export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "ALBUM GET UP",
    price: "30€",
    image: "/images/shop/Get_Up_Album_Venta.avif",
    fileExtension: "BINK",
    color: "bg-[#f9f1c3]",
    headerColor: "bg-v2k-pink-light",
    category: "album",
    shops: [
      { name: "Weverse Shop (Global)", url: "https://shop.weverse.io/en/shop/GL_USD/artists/82/categories/1217" },
      { name: "Ktown4u", url: "https://www.ktown4u.com/eventsub?eve_no=5690462&biz_no=220" },
      { name: "Yes24", url: "http://www.yes24.com/" }
    ],
    isNew: true
  },
  {
    id: 2,
    name: "ALBUM HOW SWEET",
    price: "26€",
    image: "/images/shop/How_Sweet_Album_Venta.avif",
    fileExtension: "BMP",
    color: "bg-[#e2e8f0]",
    headerColor: "bg-v2k-accent",
    category: "album",
    shops: [
      { name: "Weverse Shop (Global)", url: "https://shop.weverse.io/en/shop/GL_USD/artists/82/categories/1217" }
    ],
    isNew: true
  },
  {
    id: 3,
    name: "NEW JEANS 1ST EP",
    price: "28€",
    image: "/images/shop/NewJeans1EP_Album_Venta.avif",
    fileExtension: "JPG",
    color: "bg-[#c9e9f6]",
    headerColor: "bg-v2k-yellow-soft",
    category: "album",
    shops: [
      { name: "Weverse Shop (Global)", url: "https://shop.weverse.io/en/shop/GL_USD/artists/82/categories/1217" },
      { name: "Aladin", url: "https://www.aladin.co.kr/" }
    ]
  },
  {
    id: 4,
    name: "OFFICIAL LIGHT STICK",
    price: "45€",
    image: "/images/shop/NewJeans - Official Light Stick.avif",
    fileExtension: "EXE",
    color: "bg-[#ffffff]",
    headerColor: "bg-v2k-pink-hot/40",
    category: "merch",
    shops: [
      { name: "Weverse Shop", url: "https://shop.weverse.io/en/shop/GL_USD/artists/82/categories/1218" }
    ]
  },
  {
    id: 5,
    name: "ALBUM OMG & DITTO",
    price: "25€",
    image: "/images/shop/OMG_DITTO_Album_Venta.avif",
    fileExtension: "ICO",
    color: "bg-[#f4d8ed]",
    headerColor: "bg-v2k-green-soft",
    category: "album",
    shops: [
      { name: "Weverse Shop", url: "https://shop.weverse.io/en/shop/GL_USD/artists/82/categories/1218" },
      { name: "Ktown4u", url: "https://www.ktown4u.com/eventsub?eve_no=5690462&biz_no=220" }
    ]
  },
  {
    id: 6,
    name: "SUPERNATURAL EP",
    price: "24€",
    image: "/images/shop/Supernatural_Album_Venta.avif",
    fileExtension: "TIFF",
    color: "bg-[#fffce0]",
    headerColor: "bg-v2k-blue-deep/30",
    category: "album",
    shops: [
      { name: "Weverse Shop (Global)", url: "https://shop.weverse.io/en/shop/GL_USD/artists/82/categories/1217" }
    ]
  },
  // ─── AÑADE NUEVOS PRODUCTOS AQUÍ ───────────────────────────────────────────
  // {
  //   id: 7,
  //   name: "NOMBRE PRODUCTO",
  //   price: "XX€",
  //   image: "/images/shop/NombreArchivo.avif",
  //   fileExtension: "PNG",
  //   color: "bg-[#xxxxxx]",
  //   headerColor: "bg-v2k-accent",
  //   category: "album",  // o "merch"
  //   shops: [
  //     { name: "Nombre Tienda", url: "https://..." },
  //   ]
  // },
];
