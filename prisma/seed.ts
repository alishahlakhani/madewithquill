import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getRandomDateInRange = (dayVariance: number = 300): Date => {
  const today: Date = new Date();

  const minDate: Date = new Date(
    today.getTime() - dayVariance * 24 * 60 * 60 * 1000
  );

  const maxDate: Date = new Date(today.getTime());

  const randomTimestamp: number =
    minDate.getTime() + Math.random() * (maxDate.getTime() - minDate.getTime());
  const randomDate: Date = new Date(randomTimestamp);

  return randomDate;
};

const getRandomNumberInRange = (max: number = 50, min: number = 0) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateRandomFloatingPoint = (
  min: number = 1000,
  max: number = 300000
) => {
  const randomSalesVolume = Math.random() * (max - min) + min;
  return parseFloat(randomSalesVolume.toFixed(2));
};

const Dashboards: Array<Prisma.DashboardsCreateInput> = [
  {
    name: "User Analytics",
    category: "User",
    dateFilter_name: "User Analytics Range",
    dateFilter_initialDateRange: "LAST_90_DAYS",
  },
  {
    name: "Subscription Metrics",
    category: "Marketing",
    dateFilter_name: "Subscription Metrics Range",
    dateFilter_initialDateRange: "CURRENT_MONTH",
  },
  {
    name: "Churn Analysis",
    category: "Marketing",
    dateFilter_name: "Churn Analysis Range",
    dateFilter_initialDateRange: "LAST_30_DAYS",
  },
  {
    name: "Revenue Dashboard",
    category: "Financial",
    dateFilter_name: "Revenue Dashboard Range",
    dateFilter_initialDateRange: "CURRENT_MONTH",
  },
  {
    name: "Customer Support Metrics",
    category: "Support",
    dateFilter_name: "Customer Support Metrics Range",
    dateFilter_initialDateRange: "LAST_90_DAYS",
  },
];

const Customers: Array<Prisma.T1CustomersCreateInput> = [
  {
    name: "Aron",
    email: "Emile83@hotmail.com",
  },
  {
    name: "Jammie",
    email: "Trisha70@gmail.com",
  },
  {
    name: "Augustus",
    email: "Edmond.Hilll70@gmail.com",
  },
  {
    name: "Lamar",
    email: "Holden_Olson48@yahoo.com",
  },
  {
    name: "Halie",
    email: "Maximus_Carroll@yahoo.com",
  },
  {
    name: "Wilburn",
    email: "Eliane_Conroy12@yahoo.com",
  },
  {
    name: "Jessy",
    email: "Silas.Barrows77@hotmail.com",
  },
  {
    name: "Savion",
    email: "Jadon.Kuhic@hotmail.com",
  },
  {
    name: "Adolfo",
    email: "Garett86@yahoo.com",
  },
  {
    name: "Mariela",
    email: "Elza34@gmail.com",
  },
  {
    name: "Sarina",
    email: "Carolina_Ferry84@yahoo.com",
  },
  {
    name: "Oma",
    email: "Kiel_Murray55@hotmail.com",
  },
  {
    name: "Chelsie",
    email: "Aubrey_Yundt81@hotmail.com",
  },
  {
    name: "Cristal",
    email: "Eliza.Hodkiewicz84@gmail.com",
  },
  {
    name: "Carley",
    email: "Davin_Cronin14@yahoo.com",
  },
  {
    name: "Ardella",
    email: "Amely_Halvorson@hotmail.com",
  },
  {
    name: "Emmett",
    email: "Jessy.Metz91@yahoo.com",
  },
  {
    name: "Lincoln",
    email: "Eula_Stamm@hotmail.com",
  },
  {
    name: "Johnny",
    email: "Jonas.Steuber@yahoo.com",
  },
  {
    name: "Renee",
    email: "Maida_Miller@gmail.com",
  },
  {
    name: "Margarete",
    email: "Cornelius_Maggio@yahoo.com",
  },
  {
    name: "Marlon",
    email: "Hester_Baumbach69@hotmail.com",
  },
  {
    name: "Humberto",
    email: "Filomena_Reinger@hotmail.com",
  },
  {
    name: "Jammie",
    email: "Juwan_Osinski@yahoo.com",
  },
  {
    name: "Ryley",
    email: "Maude_Schaefer@hotmail.com",
  },
  {
    name: "Cletus",
    email: "Marshall.Senger33@gmail.com",
  },
  {
    name: "Judd",
    email: "Unique23@yahoo.com",
  },
  {
    name: "Sylvester",
    email: "Fletcher48@yahoo.com",
  },
  {
    name: "Arely",
    email: "Kariane69@hotmail.com",
  },
  {
    name: "Estrella",
    email: "Brady_Roob@gmail.com",
  },
  {
    name: "Seth",
    email: "Abelardo97@yahoo.com",
  },
  {
    name: "Maxie",
    email: "Brandi.Walker46@hotmail.com",
  },
  {
    name: "Newton",
    email: "Clement_Bogisich@yahoo.com",
  },
  {
    name: "Karlie",
    email: "Sydney.Flatley56@gmail.com",
  },
  {
    name: "Akeem",
    email: "Monserrat_Leuschke53@hotmail.com",
  },
  {
    name: "Karine",
    email: "Laverna.Armstrong@hotmail.com",
  },
  {
    name: "Noel",
    email: "Jason82@gmail.com",
  },
  {
    name: "Alexandre",
    email: "Ashlynn_Crona@gmail.com",
  },
  {
    name: "Calista",
    email: "Joy5@yahoo.com",
  },
  {
    name: "Alexandra",
    email: "Milo75@gmail.com",
  },
  {
    name: "Lina",
    email: "Sallie1@yahoo.com",
  },
  {
    name: "Savion",
    email: "Reanna.Armstrong@gmail.com",
  },
  {
    name: "Daniella",
    email: "Darian.Bartell@yahoo.com",
  },
  {
    name: "Zoey",
    email: "Camila_Rath@gmail.com",
  },
  {
    name: "Jonathan",
    email: "Joshuah51@yahoo.com",
  },
  {
    name: "Madelyn",
    email: "Odessa3@yahoo.com",
  },
  {
    name: "Kellen",
    email: "Ryan_Wunsch4@gmail.com",
  },
  {
    name: "Lina",
    email: "Emiliano_Tromp@hotmail.com",
  },
  {
    name: "Zane",
    email: "Tierra24@hotmail.com",
  },
  {
    name: "Robert",
    email: "Parker_Graham@yahoo.com",
  },
];

const Products: Array<Prisma.T1ProductsCreateInput> = [
  {
    name: "Handcrafted Cotton Towels",
    price: 42.0,
  },
  {
    name: "Awesome Concrete Fish",
    price: 463.0,
  },
  {
    name: "Handcrafted Frozen Hat",
    price: 459.0,
  },
  {
    name: "Small Soft Table",
    price: 322.0,
  },
  {
    name: "Unbranded Fresh Mouse",
    price: 458.0,
  },
  {
    name: "Licensed Plastic Chair",
    price: 696.0,
  },
  {
    name: "Rustic Plastic Chicken",
    price: 506.0,
  },
  {
    name: "Fantastic Rubber Gloves",
    price: 738.0,
  },
  {
    name: "Sleek Frozen Towels",
    price: 658.0,
  },
  {
    name: "Intelligent Wooden Hat",
    price: 571.0,
  },
  {
    name: "Fantastic Frozen Pants",
    price: 955.0,
  },
  {
    name: "Gorgeous Wooden Keyboard",
    price: 415.0,
  },
  {
    name: "Unbranded Plastic Ball",
    price: 554.0,
  },
  {
    name: "Unbranded Steel Gloves",
    price: 411.0,
  },
  {
    name: "Small Steel Sausages",
    price: 285.0,
  },
  {
    name: "Small Fresh Chicken",
    price: 234.0,
  },
  {
    name: "Unbranded Fresh Shirt",
    price: 418.0,
  },
  {
    name: "Handmade Rubber Sausages",
    price: 567.0,
  },
  {
    name: "Ergonomic Rubber Keyboard",
    price: 376.0,
  },
  {
    name: "Handmade Plastic Ball",
    price: 609.0,
  },
  {
    name: "Unbranded Cotton Chicken",
    price: 226.0,
  },
  {
    name: "Fantastic Wooden Soap",
    price: 658.0,
  },
  {
    name: "Practical Frozen Keyboard",
    price: 317.0,
  },
  {
    name: "Practical Granite Gloves",
    price: 482.0,
  },
  {
    name: "Refined Rubber Mouse",
    price: 426.0,
  },
  {
    name: "Handcrafted Rubber Hat",
    price: 919.0,
  },
  {
    name: "Small Frozen Shoes",
    price: 102.0,
  },
  {
    name: "Licensed Fresh Sausages",
    price: 249.0,
  },
  {
    name: "Handcrafted Cotton Shirt",
    price: 464.0,
  },
  {
    name: "Refined Cotton Towels",
    price: 872.0,
  },
  {
    name: "Intelligent Granite Fish",
    price: 904.0,
  },
  {
    name: "Ergonomic Frozen Towels",
    price: 933.0,
  },
  {
    name: "Incredible Wooden Gloves",
    price: 156.0,
  },
  {
    name: "Licensed Metal Table",
    price: 565.0,
  },
  {
    name: "Generic Frozen Car",
    price: 36.0,
  },
  {
    name: "Generic Cotton Car",
    price: 728.0,
  },
  {
    name: "Ergonomic Steel Chicken",
    price: 332.0,
  },
  {
    name: "Tasty Cotton Computer",
    price: 888.0,
  },
  {
    name: "Sleek Metal Pants",
    price: 433.0,
  },
  {
    name: "Handcrafted Cotton Bike",
    price: 211.0,
  },
  {
    name: "Refined Rubber Keyboard",
    price: 139.0,
  },
  {
    name: "Small Steel Table",
    price: 296.0,
  },
  {
    name: "Awesome Rubber Bacon",
    price: 911.0,
  },
  {
    name: "Sleek Fresh Bike",
    price: 563.0,
  },
  {
    name: "Ergonomic Granite Fish",
    price: 846.0,
  },
  {
    name: "Handcrafted Rubber Mouse",
    price: 776.0,
  },
  {
    name: "Handmade Frozen Bike",
    price: 614.0,
  },
  {
    name: "Licensed Rubber Cheese",
    price: 211.0,
  },
  {
    name: "Practical Wooden Towels",
    price: 608.0,
  },
  {
    name: "Gorgeous Plastic Mouse",
    price: 801.0,
  },
];

async function main() {
  await prisma.dashboards.createMany({
    data: Dashboards,
    skipDuplicates: true,
  });

  await prisma.t1Customers.createMany({
    data: Customers.map((customer, index) => ({
      ...customer,
      id: `C${index}`,
      createdAt: getRandomDateInRange(300),
    })),
    skipDuplicates: true,
  });

  await prisma.t1Products.createMany({
    data: Products.map((product, index) => ({
      ...product,
      id: `P${index}`,
      createdAt: getRandomDateInRange(300),
    })),
    skipDuplicates: true,
  });

  await prisma.t1Transactions
    .createMany({
      data: Array(3000)
        .fill(0)
        .map((_p) => ({
          grossSalesVolume: generateRandomFloatingPoint(),
          productId: `P${getRandomNumberInRange(Products.length - 1)}`,
          customerId: `C${getRandomNumberInRange(Customers.length - 1)}`,
          createdAt: getRandomDateInRange(3000),
        })),
      skipDuplicates: true,
    })
    .catch((e) => {
      console.log(e);
    });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
