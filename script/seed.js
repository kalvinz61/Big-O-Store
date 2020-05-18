'use strict'

const db = require('../server/db')
const {
  User,
  Product,
  Cart,
  Department,
  Category
} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      email: 'admin@gmail.com',
      password: 'admin',
      name: 'admin',
      address: '123 fake rd__New York__NY__11206__USA',
      isAdmin: true
    }),
    User.create({
      email: 'murphy@gmail.com',
      name: 'murphy',
      address: '123 fake rd__New York__NY__11206__USA',
      password: '123'
    }),
    User.create(),
    User.create(),
    User.create()
  ])
  const carts = await Promise.all([
    Cart.create({userId: users[0].id}),
    Cart.create({userId: users[1].id}),
    Cart.create({userId: users[2].id}),
    Cart.create({userId: users[2].id}),
    Cart.create({userId: users[2].id})
  ])

  const [maintenance, upgrades] = await Promise.all([
    Department.create({name: 'Maintenance'}),
    Department.create({name: 'Upgrades'})
  ])

  const [
    batteriesCat,
    wipersCat,
    sparkPlugsCat,
    exhaustCat,
    tiresCat,
    brakesCat,
    powertrainCat,
    chassisCat
  ] = await Promise.all([
    Category.create({
      name: 'Batteries',
      imageUrl:
        'https://sc02.alicdn.com/kf/UTB8gf33DpfFXKJk43Ot760IPFXaB.png_350x350.png'
    }),
    Category.create({
      name: 'Wipers',
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/61rsZ0hVufL._AC_SX679_.jpg'
    }),
    Category.create({
      name: 'Spark plugs',
      imageUrl: 'https://cdn.fiix.io/1/articles/sparkplugs.jpg'
    }),
    Category.create({
      name: 'Exhausts',
      imageUrl:
        'https://europeanautosource.com/media/catalog/product/cache/33799cb380d7f212fd4b31c85d61d9b3/a/k/akrapovic_-_evolution_titanium_exhaust_system_-_f85_x5m_f86_x6m_00.jpg'
    }),
    Category.create({
      name: 'Tires',
      imageUrl: '/productImages/Bridgestone Summer Tire.png'
    }),
    Category.create({
      name: 'Brakes',
      imageUrl:
        'https://www.futurefordclovis.com/assets/shared/images/service/brakes_05.jpg'
    }),
    Category.create({
      name: 'Powertrain',
      imageUrl:
        'https://www.mynrma.com.au/-/media/car-servicing/car-engine-drivetrain-blueprint.jpg?h=500&la=en&w=1140&hash=1A752477F6887551776A8F8519231DAB'
    }),
    Category.create({
      name: 'Chassis',
      imageUrl:
        'https://cuymar.com/noticias/wp-content/uploads/2018/12/como-funciona-suspension-neumatica.jpg'
    })
  ])

  const products = await Promise.all([
    Product.create({
      name: 'Duralast Platinum Battery H7-AGM Group Size 94R 850 CCA',
      price: 199.99,
      stock: 100,
      description:
        'Duralast Platinum is an Absorbed Glass Mat (AGM) battery designed to give you the ultimate combination of power, durability and flexibility. Delivering maximum Cold Cranking Amps and Reserve Capacity, Duralast Platinum provides safe, reliable power to vehicles with multiple electronic accessories. Leak proof and non-spill able for safer maintenance-free power. Cycles more and recharges faster. Designed to provide maximum starting power and deep cycle capability. Constructed for greater vibration resistance and enhanced durability. Two times the cycle life of conventional batteries. Advanced technology for vehicles with accessories that demand greater power',
      partNumber: 'H7-AGM',
      weight: 53.56,
      rating: 4.9,
      imageUrl:
        'https://contentinfo.autozone.com/znetcs/product-info/en/US/jci/H7-AGM/image/3/',
      categoryId: batteriesCat.id,
      departmentId: maintenance.id,
      brand: 'Duralast Platinum'
    }),
    Product.create({
      name: 'Duralast Platinum Battery 46B24R-AGM Group Size 46B24R 410 CCA',
      price: 199.99,
      stock: 100,
      description:
        'Duralast Platinum is an Absorbed Glass Mat (AGM) battery designed to give you the ultimate combination of power, durability and flexibility. Delivering maximum Cold Cranking Amps and Reserve Capacity, Duralast Platinum provides safe, reliable power to vehicles with multiple electronic accessories. Leak proof and non-spill able for safer maintenance-free power. Cycles more and recharges faster. Designed to provide maximum starting power and deep cycle capability. Constructed for greater vibration resistance and enhanced durability. Two times the cycle life of conventional batteries. Advanced technology for vehicles with accessories that demand greater power',
      partNumber: '46B24R-AGM',
      weight: 29.33,
      rating: 4.4,
      imageUrl:
        'https://contentinfo.autozone.com/znetcs/product-info/en/US/jci/46B24R-AGM/image/3/',
      categoryId: batteriesCat.id,
      departmentId: maintenance.id,
      brand: 'Duralast Platinum'
    }),
    Product.create({
      name: 'Duralast Gold Battery H6-DLG Group Size 48 730 CCA',
      price: 159.99,
      stock: 269,
      description:
        'Duralast Gold is engineered to deliver the maximum Cold Cranking Amps and Reserve Capacity ratings to meet or exceed your vehicle&apos;s original specifications. Even in extreme conditions, Duralast Gold is designed to give you the starting power you need, combined with robust construction for dependability and long life. Install it with confidence! Impact resistant polypropylene construction to reduce damage due to vibration. Maximum number of plates and grids to deliver the most power during start up. Specially designed paste to improve performance. Best-in-class vent caps for safe operation',
      partNumber: 'H6-DLG',
      weight: 38.81,
      rating: 4.6,
      imageUrl:
        'https://contentinfo.autozone.com/znetcs/product-info/en/US/jci/H6-DLG/image/3/',
      categoryId: batteriesCat.id,
      departmentId: maintenance.id,
      brand: 'Duralast Gold'
    }),
    Product.create({
      name: 'Duralast Gold Battery 65-DLG Group Size 65 850 CCA',
      price: 159.99,
      stock: 388,
      description:
        'Duralast Gold is engineered to deliver the maximum Cold Cranking Amps and Reserve Capacity ratings to meet or exceed your vehicle&apos;s original specifications. Even in extreme conditions, Duralast Gold is designed to give you the starting power you need, combined with robust construction for dependability and long life. Install it with confidence! Impact resistant polypropylene construction to reduce damage due to vibration. Maximum number of plates and grids to deliver the most power during start up. Specially designed paste to improve performance. Best-in-class vent caps for safe operation',
      partNumber: 'H6-DLG',
      weight: 46.43,
      rating: 4.5,
      imageUrl:
        'https://contentinfo.autozone.com/znetcs/product-info/en/US/jci/65-DLG/image/3/',
      categoryId: batteriesCat.id,
      departmentId: maintenance.id,
      brand: 'Duralast Gold'
    }),
    Product.create({
      name: 'Duralast Battery 26R-DL Group Size 26R 575 CCA',
      price: 139.99,
      stock: 75,
      description:
        'Duralast Gold is engineered to deliver the maximum Cold Cranking Amps and Reserve Capacity ratings to meet or exceed your vehicle&apos;s original specifications. Even in extreme conditions, Duralast Gold is designed to give you the starting power you need, combined with robust construction for dependability and long life. Install it with confidence! Impact resistant polypropylene construction to reduce damage due to vibration. Maximum number of plates and grids to deliver the most power during start up. Specially designed paste to improve performance. Best-in-class vent caps for safe operation',
      partNumber: '26R-DL',
      weight: 28.41,
      rating: 4.6,
      imageUrl:
        'https://contentinfo.autozone.com/znetcs/product-info/en/US/jci/26R-DL/image/3/',
      categoryId: batteriesCat.id,
      departmentId: maintenance.id,
      brand: 'Duralast'
    }),
    Product.create({
      name: 'Duralast Platinum Battery H5-AGM Group Size H5/LN2 680 CCA',
      price: 199.99,
      stock: 0,
      description:
        'Duralast Platinum is an Absorbed Glass Mat (AGM) battery designed to give you the ultimate combination of power, durability and flexibility. Delivering maximum Cold Cranking Amps and Reserve Capacity, Duralast Platinum provides safe, reliable power to vehicles with multiple electronic accessories. Leak proof and non-spill able for safer maintenance-free power. Cycles more and recharges faster. Designed to provide maximum starting power and deep cycle capability. Constructed for greater vibration resistance and enhanced durability. Two times the cycle life of conventional batteries. Advanced technology for vehicles with accessories that demand greater power',
      partNumber: 'H5-AGM',
      weight: 39.25,
      rating: 4.8,
      imageUrl:
        'https://contentinfo.autozone.com/znetcs/product-info/en/US/jci/H5-AGM/image/3/',
      categoryId: batteriesCat.id,
      departmentId: maintenance.id,
      brand: 'Duralast Platinum'
    }),
    Product.create({
      name: 'Duralast Platinum Battery 24F-AGM Group Size 24F 710 CCA',
      price: 199.99,
      stock: 0,
      description:
        'Duralast Platinum is an Absorbed Glass Mat (AGM) battery designed to give you the ultimate combination of power, durability and flexibility. Delivering maximum Cold Cranking Amps and Reserve Capacity, Duralast Platinum provides safe, reliable power to vehicles with multiple electronic accessories. Leak proof and non-spill able for safer maintenance-free power. Cycles more and recharges faster. Designed to provide maximum starting power and deep cycle capability. Constructed for greater vibration resistance and enhanced durability. Two times the cycle life of conventional batteries. Advanced technology for vehicles with accessories that demand greater power',
      partNumber: 'H5-AGM',
      weight: 45.15,
      rating: 4.7,
      imageUrl:
        'https://contentinfo.autozone.com/znetcs/product-info/en/US/jci/24F-AGM/image/3/',
      categoryId: batteriesCat.id,
      departmentId: maintenance.id,
      brand: 'Duralast Platinum'
    }),
    Product.create({
      name: 'Bosch Envision 26in Beam Wiper Blade',
      price: 29.99,
      stock: 74,
      description:
        'Bosch Envision with Night Focus technology for sharpened night visibility and Clear Max 365 which creates an optimal wipe angle to minimize glare for safer driving. The NightBlack™ spoiler combines a light absorbing charcoal powder and water repelling polymer compound that reduces glare from reflective lights for enhanced visibility. NightFocus™ technology fuses the base connector and blade, forming a single core construction. This provides uniform wiping stability across the entire length of the blade to reduce blur for sharpened night visibility. ClearMax 365™ features a flexible dual synthetic rubber blend and a precision cut polymer edge that creates an optimal wipe angle to minimize glare for safer driving. NightBlack™ spoiler combines a light absorbing charcoal powder and water repelling polymer compound that reduces glare from reflective lights for enhanced visibility. When the SafeCheck indicator turns yellow, it is time to check your blades for safer driving in rain, sleet and snow.',
      partNumber: 'EN26',
      weight: 0.6,
      rating: 4.8,
      length: 26,
      color: 'Black',
      imageUrl:
        'https://contentinfo.autozone.com/znetcs/product-info/en/US/bos/EN26/image/3/',
      categoryId: wipersCat.id,
      departmentId: maintenance.id,
      brand: 'Bosch'
    }),
    Product.create({
      name: 'Bosch Envision 24in Beam Wiper Blade',
      price: 29.99,
      stock: 57,
      description:
        'Bosch Envision with Night Focus technology for sharpened night visibility and Clear Max 365 which creates an optimal wipe angle to minimize glare for safer driving. The NightBlack™ spoiler combines a light absorbing charcoal powder and water repelling polymer compound that reduces glare from reflective lights for enhanced visibility. NightFocus™ technology fuses the base connector and blade, forming a single core construction. This provides uniform wiping stability across the entire length of the blade to reduce blur for sharpened night visibility. ClearMax 365™ features a flexible dual synthetic rubber blend and a precision cut polymer edge that creates an optimal wipe angle to minimize glare for safer driving. NightBlack™ spoiler combines a light absorbing charcoal powder and water repelling polymer compound that reduces glare from reflective lights for enhanced visibility. When the SafeCheck indicator turns yellow, it is time to check your blades for safer driving in rain, sleet and snow.',
      partNumber: 'EN24OE',
      weight: 0.6,
      rating: 4.5,
      length: 24,
      color: 'Black',
      imageUrl:
        'https://contentinfo.autozone.com/znetcs/product-info/en/US/bos/EN26/image/3/',
      categoryId: wipersCat.id,
      departmentId: maintenance.id,
      brand: 'Bosch'
    }),
    Product.create({
      name: 'Duralast 22in Conventional Wiper Blade',
      price: 13.99,
      stock: 187,
      description:
        'Conventional wiper blade. Universal adapter. Easy installation. All metal frame for extreme durability. Designed not to break or rust.',
      partNumber: 'DL-22',
      weight: 0.44,
      rating: 4.6,
      length: 22,
      color: 'Black',
      imageUrl:
        'https://contentinfo.autozone.com/znetcs/product-info/en/US/owi/DL-18/image/3/',
      categoryId: wipersCat.id,
      departmentId: maintenance.id,
      brand: 'Duralast'
    }),
    Product.create({
      name: 'Duralast 18in Conventional Wiper Blade',
      price: 11.99,
      stock: 123,
      description:
        'Conventional wiper blade. Universal adapter. Easy installation. All metal frame for extreme durability. Designed not to break or rust.',
      partNumber: 'DL-18',
      weight: 0.34,
      rating: 4.5,
      length: 18,
      color: 'Black',
      imageUrl:
        'https://contentinfo.autozone.com/znetcs/product-info/en/US/owi/DL-18/image/3/',
      categoryId: wipersCat.id,
      departmentId: maintenance.id,
      brand: 'Duralast'
    }),
    Product.create({
      name: 'Rain X Quantum 18in Beam Wiper Blade',
      price: 26.99,
      stock: 37,
      description:
        'The Rain‑X Quantum wiper blade has breakthrough technology that applies water-repelling coating as you wipe your windshield and has a unique blade change indicator to remind you when to change your blades, All weather durability. Blade change indicator, Applies water repellent, Easy connector system',
      partNumber: '870032',
      weight: 0.27,
      rating: 4.7,
      length: 18,
      color: 'Black',
      imageUrl:
        'https://contentinfo.autozone.com/znetcs/product-info/en/US/itw/870032/image/3/',
      categoryId: wipersCat.id,
      departmentId: maintenance.id,
      brand: 'Rain X'
    }),
    Product.create({
      name: 'Rain X Quantum 22in Beam Wiper Blade',
      price: 28.99,
      stock: 86,
      description:
        'The Rain‑X Quantum wiper blade has breakthrough technology that applies water-repelling coating as you wipe your windshield and has a unique blade change indicator to remind you when to change your blades, All weather durability. Blade change indicator, Applies water repellent, Easy connector system',
      partNumber: '870039',
      weight: 0.32,
      rating: 4.5,
      length: 22,
      color: 'Black',
      imageUrl:
        'https://contentinfo.autozone.com/znetcs/product-info/en/US/itw/870039/image/3/',
      categoryId: wipersCat.id,
      departmentId: maintenance.id,
      brand: 'Rain X'
    }),
    Product.create({
      name: 'Bosch Iridium Spark Plug 9600',
      price: 7.49,
      stock: 24,
      description:
        'The only iridium spark plug line engineered for both high performance and long life. The laser welded iridium tipped center and ground electrodes (Double iridium) provide exceptionally long life. 4x longer service life vs standard copper spark plugs, Ultra fine wire iridium center electrode requires less voltage to fire delivering exceptional ignitability, The laser welded iridium tipped center and ground electrodes (Double Iridium) provide exceptionally long life BOSCH exclusive tapered laser-welded iridium alloy tipped ground electrode delivers the ultimate in high performance, Factory set pre-gap ensures ease of installation.',
      partNumber: '9600',
      weight: 0.12,
      rating: 4.7,
      length: 0.75,
      imageUrl:
        'https://contentinfo.autozone.com/znetcs/product-info/en/US/bos/9600/image/3/',
      categoryId: sparkPlugsCat.id,
      departmentId: upgrades.id,
      brand: 'Bosch'
    }),
    Product.create({
      name: 'Bosch Iridium Spark Plug 9652',
      price: 7.49,
      stock: 6,
      description:
        'The only iridium spark plug line engineered for both high performance and long life. The laser welded iridium tipped center and ground electrodes (Double iridium) provide exceptionally long life. 4x longer service life vs standard copper spark plugs, Ultra fine wire iridium center electrode requires less voltage to fire delivering exceptional ignitability, The laser welded iridium tipped center and ground electrodes (Double Iridium) provide exceptionally long life BOSCH exclusive tapered laser-welded iridium alloy tipped ground electrode delivers the ultimate in high performance, Factory set pre-gap ensures ease of installation.',
      partNumber: '9652',
      weight: 0.12,
      rating: 5.0,
      length: 0.75,
      imageUrl:
        'https://contentinfo.autozone.com/znetcs/product-info/en/US/bos/9652/image/3/',
      categoryId: sparkPlugsCat.id,
      departmentId: upgrades.id,
      brand: 'Bosch'
    }),
    Product.create({
      name: 'Motorcraft Iridium Spark Plug SP-535',
      price: 6.99,
      stock: 9,
      description:
        'Tested to Ford specifications for performance and emission standards. Same part that was installed when the vehicle rolled-off the assembly line. Designed to deliver quick starts, enhanced fuel economy and smooth acceleration with 60,000 to 100,000 mile service interval. Platinum pad on both electrodes with proprietary platinum pad on the side wire electrode. Nickel plated shell for corrosion resistance and improved appearance.',
      partNumber: 'SP-535',
      weight: 0.01,
      rating: 4.7,
      length: 0.75,
      imageUrl:
        'https://contentinfo.autozone.com/znetcs/product-info/en/US/mtc/SP-535/image/3/',
      categoryId: sparkPlugsCat.id,
      departmentId: upgrades.id,
      brand: 'Motorcraft'
    }),
    Product.create({
      name: 'Motorcraft Iridium Spark Plug SP-530',
      price: 7.99,
      stock: 5,
      description:
        'Tested to Ford specifications for performance and emission standards. Same part that was installed when the vehicle rolled-off the assembly line. Designed to deliver quick starts, enhanced fuel economy and smooth acceleration with 60,000 to 100,000 mile service interval. Platinum pad on both electrodes with proprietary platinum pad on the side wire electrode. Nickel plated shell for corrosion resistance and improved appearance.',
      partNumber: 'SP-530',
      weight: 0.45,
      rating: 4.6,
      length: 0.75,
      imageUrl:
        'https://contentinfo.autozone.com/znetcs/product-info/en/US/mtc/SP-530/image/3/',
      categoryId: sparkPlugsCat.id,
      departmentId: upgrades.id,
      brand: 'Motorcraft'
    }),
    Product.create({
      name: 'Autolite XP Iridium Spark Plug XP3923',
      price: 7.99,
      stock: 24,
      description:
        'Our best spark plug! Autolite has over 100 years of engineering experience and has sold over 11 billion plugs. Designed and engineered in the USA, the Autolite Iridium XP spark plugs feature an iridium-enhanced 0.6 mm finewire design and patented platinum sidewire technology to provide better overall durability and a more focused ignition for enhanced ignitability and performance. Features double iridium-enhanced alloy technology center electrode for improved durability and wear resistance. 0.6 mm finewire design improves ignitability, Patented V-trimmed platinum sidewire technology resists we, OE equivalent design is engineered for every engine, Designed for better overall durability with virtually no gap erosion',
      partNumber: 'XP3923',
      weight: 0.45,
      rating: 4.2,
      length: 0.75,
      imageUrl:
        'https://contentinfo.autozone.com/znetcs/product-info/en/US/aut/XP3923/image/3/',
      categoryId: sparkPlugsCat.id,
      departmentId: maintenance.id,
      brand: 'Autolite'
    }),
    Product.create({
      name: 'Autolite XP Iridium Spark Plug XP5702',
      price: 7.99,
      stock: 8,
      description:
        'Our best spark plug! Autolite has over 100 years of engineering experience and has sold over 11 billion plugs. Designed and engineered in the USA, the Autolite Iridium XP spark plugs feature an iridium-enhanced 0.6 mm finewire design and patented platinum sidewire technology to provide better overall durability and a more focused ignition for enhanced ignitability and performance. Features double iridium-enhanced alloy technology center electrode for improved durability and wear resistance. 0.6 mm finewire design improves ignitability, Patented V-trimmed platinum sidewire technology resists we, OE equivalent design is engineered for every engine, Designed for better overall durability with virtually no gap erosion',
      partNumber: 'XP3923',
      weight: 0.09,
      rating: 5.0,
      length: 0.66,
      imageUrl:
        'https://contentinfo.autozone.com/znetcs/product-info/en/US/aut/XP5702/image/3/',
      categoryId: sparkPlugsCat.id,
      departmentId: maintenance.id,
      brand: 'Autolite'
    }),
    Product.create({
      name: 'Duralast Ceramic Brake Pads D866',
      price: 31.99,
      stock: 38,
      description:
        'Duralast brake pads are designed to provide reliable performance for the everyday driver. Duralast brake pads use platform specific friction materials with both Ceramic and Semi-Metallic formulations. If you are experiencing longer stopping distances or if your brakes are squealing, Duralast Pads are a good replacement choice for you. Comprehensive vehicle coverage. Duralast Official Brakes of NASCAR, Reliable stopping performance, Single layer steel shim for noise dampening, Powder coated backing plate to resist corrosion, Ceramic friction formula',
      partNumber: 'D866',
      weight: 3.7,
      rating: 4.7,
      imageUrl:
        'https://contentinfo.autozone.com/znetcs/product-info/en/US/epa/D866/image/3/',
      categoryId: brakesCat.id,
      departmentId: maintenance.id,
      brand: 'Duralast'
    }),
    Product.create({
      name: 'Duralast Semi-Metallic Brake Pads MKD699',
      price: 26.99,
      stock: 30,
      description:
        'Duralast brake pads are designed to provide reliable performance for the everyday driver. Duralast brake pads use platform specific friction materials with both Organic and Semi-Metallic formulations. If you are experiencing longer stopping distances or if your brakes are squealing, Duralast Pads are a good replacement choice for you. Comprehensive vehicle coverage, Duralast Official Brakes of NASCAR, Reliable stopping performance, Single layer steel shim for noise dampening, Powder coated backing plate to resist corrosion, Semi-Metallic friction formula',
      partNumber: 'MKD699',
      weight: 3.95,
      rating: 4.7,
      imageUrl:
        'https://contentinfo.autozone.com/znetcs/product-info/en/US/epa/MKD699/image/3/',
      categoryId: brakesCat.id,
      departmentId: maintenance.id,
      brand: 'Duralast'
    }),
    Product.create({
      name: 'Valucraft Semi-Metallic Brake Pads MKD864V',
      price: 99.99,
      stock: 0,
      description: 'No description',
      partNumber: 'MKD864V',
      weight: 3.95,
      rating: 0.0,
      imageUrl:
        'https://contentinfo.autozone.com/znetcs/product-info/en/US/epv/MKD864V/image/3/',
      categoryId: brakesCat.id,
      departmentId: maintenance.id,
      brand: 'Valucraft'
    }),
    Product.create({
      name: 'Valucraft Semi-Metallic Brake Pads MKD52SV',
      price: 17.99,
      stock: 0,
      description: 'This brake pad offers standard performance.',
      partNumber: 'MKD52SV',
      weight: 3.95,
      rating: 0.0,
      imageUrl:
        'https://contentinfo.autozone.com/znetcs/product-info/en/US/epa/MKD52SV/image/3/',
      categoryId: brakesCat.id,
      departmentId: maintenance.id,
      brand: 'Valucraft'
    }),
    Product.create({
      name: 'Borla Exhaust',
      price: 600.99,
      stock: 15,
      description:
        'Upgrading your factory exhaust system to a Borla stainless steel performance exhaust system with a more efficient and less restrictive design can improve sound (adding more enjoyment driving your vehicle) and increase engine horsepower and torque throughout the RPM range (allowing quicker acceleration to pass a vehicle or get to highway speeds quicker).',
      imageUrl: '/productImages/borla exhaust.jpg',
      departmentId: upgrades.id,
      categoryId: exhaustCat.id
    }),
    Product.create({
      name: 'Cobb Tuning Exhaust',
      price: 800.99,
      stock: 20,
      description:
        'We combine our SS Non-Resonated 3" J-Pipe and Titanium Cat-Back exhaust to create the ultimate exhaust solution for you 2015+ WRX! Simple bolt-on installation of these components offers excellent power gains, outstanding build quality, and an impressive exhaust note. The Turboback includes the COBB SS 3" J-Pipe and the COBB 3" WRX Titanium Cat-Back Exhaust',
      imageUrl: '/productImages/Cobb Exhaust.jpg',
      departmentId: upgrades.id,
      categoryId: exhaustCat.id
    }),
    Product.create({
      name: 'Big O Exhaust',
      price: 9999.99,
      stock: 50,
      description: 'Add 1000HP',
      imageUrl: '/productImages/Big o exhaust.jpg',
      departmentId: upgrades.id,
      categoryId: exhaustCat.id
    }),
    Product.create({
      name: 'Hoosier Race Tire',
      price: 400.99,
      stock: 23,
      description: 'Add 1000HP',
      imageUrl: '/productImages/Bridgestone Summer Tire.png',
      departmentId: upgrades.id,
      categoryId: tiresCat.id
    }),
    Product.create({
      name: 'Bridgestone Summer Tire',
      price: 150.99,
      stock: 12,
      description:
        'Bridgestone’s premiere performance tires are engineered to deliver a thrilling ride, no matter where the road takes you. Potenza performance tires provide dynamic handling, exceptional traction, and more responsiveness than standard passenger tires. Every element, from the tires’ tread pattern to their shoulder stiffness, has been engineered to keep you going further, faster, longer.',
      imageUrl: '/productImages/Bridgestone Summer Tire.png',
      departmentId: maintenance.id,
      categoryId: tiresCat.id
    }),
    Product.create({
      name: 'Falken All-Season Tire',
      price: 115.99,
      stock: 31,
      description:
        "For drivers who want a combination of sophisticated low-profile tires/large rim diameter wheels to enhance their vehicle's appearance with all-season versatility, including traction in light snow",
      imageUrl: '/productImages/Falken Tire.png',
      departmentId: maintenance.id,
      categoryId: tiresCat.id
    }),
    Product.create({
      name: 'Big-O Tire',
      price: 1000.99,
      stock: 12,
      description: 'Stickiest race tire ever',
      imageUrl: '/productImages/Big O Tire.png',
      departmentId: upgrades.id,
      categoryId: tiresCat.id
    }),
    Product.create({
      name: 'Big-O Turbo Kit',
      price: 15000.99,
      stock: 11,
      description: 'Add 1000HP',
      imageUrl: '/productImages/Big O Turbo Kit.png',
      departmentId: upgrades.id,
      categoryId: powertrainCat.id
    }),
    Product.create({
      name: 'Big-O Flex Fuel Kit',
      price: 1500.99,
      stock: 2,
      description:
        'A complete plug and play solution enabling users to convert their vehicle to a Flex Fuel configuration without losing factory compensations. This is the easiest to use and most sophisticated Flex Fuel kit on the market. Utilizing OEM fuel and electronic connectors, the Ethanol Sensor Kit measures the ethanol content of fuel being fed to the motor. That data is then converted into a signal that the ECU can use for adjusting calibrations and to be displayed on a custom Accessport monitor',
      imageUrl: '/productImages/Big O Flex Fuel Kit.png',
      departmentId: upgrades.id,
      categoryId: powertrainCat.id
    }),
    Product.create({
      name: 'Ohlins Coilovers',
      price: 2500.99,
      stock: 2,
      description:
        'Öhlins DEDICATED suspension systems offer race-level performance in a complete, ready-to-install package. Applications are shake rig developed and track validated with specific spring rates (manufactured by Swift to Öhlins specs), clicker settings, and ride height specifications. Öhlins looks at the entire performance picture when developing DEDICATED systems, as each is engineered to perform with proven track setups for each specific chassis.',
      imageUrl: '/productImages/Ohlins Coilovers.png',
      departmentId: upgrades.id,
      categoryId: chassisCat.id
    })
  ])

  await Promise.all([
    carts[0].addProduct(products[0]),
    carts[0].addProduct(products[1]),
    carts[0].addProduct(products[2]),
    carts[0].addProduct(products[3]),
    carts[0].addProduct(products[4]),
    carts[0].addProduct(products[5]),
    carts[0].addProduct(products[6]),
    carts[0].addProduct(products[7]),
    carts[1].addProduct(products[1]),
    carts[2].addProduct(products[3]),
    carts[2].addProduct(products[4]),
    carts[2].addProduct(products[6]),
    carts[3].addProduct(products[6]),
    carts[4].addProduct(products[5]),
    carts[4].addProduct(products[4])
  ])
  //updating a cart item quantity
  // await CartsProducts.findOne({
  //   where: {
  //     cartId: carts[0].id,
  //     productId: products[0].id
  //   }
  // }).then(foundCartItem => {
  //   foundCartItem.update({quantity: foundCartItem.quantity + 5})
  // })

  // const log = await Cart.findOne({
  //   where: {id: carts[0].id},
  //   include: [Product]
  // })

  // console.log(log.get().products)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
