import categoryImage from '../assets/p1.jpg'
const data = [
  {
    _id: '6247b6d8b83538cc82c13b07',
    title: 'White EliteBook Tablet',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.',
    richDescription:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,",
    images: [
      '/images/p1.jpg',
      '/images/p1.jpg',
      '/images/p1.jpg',
      '/images/p1.jpg',
      
      
    ],
    brand: 'Apple',
    price: 900,
    onSalePrice: 0,
    category: '6247952c2c7d38317ad7a99e',
    isFeatured: true,
    onSale: false,
    stock: 100,
    rating: 4,
    reviews: [
      {
        name: 'Sayed',
        email: 'sayed@gmail.com',
        message: 'nice product',
        rating: 5,
        user: '6245058fe9c2259f0b069d40',
        _id: '6247d04e0f4cdbe5ec494f2d',
      },
      {
        name: 'Sayed',
        email: 'sayed1@gmail.com',
        message: 'nice product',
        rating: 10,
        user: '624505c7512031b333d63909',
        _id: '6247d0380f4cdbe5ec494f26',
      },
    ],
    createdAt: '2022-04-02T02:37:12.474Z',
    updatedAt: '2022-04-02T04:25:50.786Z',
    __v: 21,
    COD: true, // cash on delivery
    secureTransaction: true,
  },]

export const categories = [
  {
    catTitle: 'Mobile accessories',
    id: 1,
    subCategory: [
      { title: 'Mobile Covers', image: categoryImage },
      { title: 'Screen Protectors', image: categoryImage },
      { title: 'Cables', image: categoryImage },
      { title: 'Headphones', image: categoryImage },
    ],
  },
 
];

export default data;
