import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();

async function main() {
  console.log('cleaning data...');
  await client.invoice.deleteMany();

  console.log('seeding data...');
  await client.invoice.create({
    data: {
      issueDate: new Date('2021-08-18'),
      paymentDue: new Date('2021-08-19'),
      description: 'Re-branding',
      paymentTerms: 1,
      clientName: 'Jensen Huang',
      clientEmail: 'jensenh@mail.com',
      status: 'PAID',
      total: '1800.90',
      senderAddress: {
        create: {
          street: '19 Union Terrace',
          city: 'London',
          postCode: 'E1 3EZ',
          country: 'United Kingdom',
        },
      },
      clientAddress: {
        create: {
          street: '106 Kendell Street',
          city: 'Sharrington',
          postCode: 'NR24 5WQ',
          country: 'United Kingdom',
        },
      },
      invoiceItems: {
        createMany: {
          data: [
            {
              name: 'Brand Guidelines',
              quantity: 1,
              price: 1800.9,
              total: 1800.9,
            },
          ],
        },
      },
    },
  });
  await client.invoice.create({
    data: {
      issueDate: new Date('2021-10-11'),
      paymentDue: new Date('2021-10-12'),
      description: 'Logo Concept',
      paymentTerms: 1,
      clientName: 'Alysa Werner',
      clientEmail: 'alysa@email.co.uk',
      status: 'PENDING',
      total: '102.04',
      senderAddress: {
        create: {
          street: '19 Union Terrace',
          city: 'London',
          postCode: 'E1 3EZ',
          country: 'United Kingdom',
        },
      },
      clientAddress: {
        create: {
          street: '63 Warwick Road',
          city: 'Carlisle',
          postCode: 'CA20 2TG',
          country: 'United Kingdom',
        },
      },
      invoiceItems: {
        createMany: {
          data: [
            {
              name: 'Logo Sketches',
              quantity: 1,
              price: 102.04,
              total: 102.04,
            },
          ],
        },
      },
    },
  });
  await client.invoice.create({
    data: {
      issueDate: new Date('2021-10-07'),
      paymentDue: new Date('2021-10-14'),
      description: 'Re-branding',
      paymentTerms: 7,
      clientName: 'Mellisa Clarke',
      clientEmail: 'mellisa.clarke@example.com',
      status: 'PENDING',
      total: '4032.33',
      senderAddress: {
        create: {
          street: '19 Union Terrace',
          city: 'London',
          postCode: 'E1 3EZ',
          country: 'United Kingdom',
        },
      },
      clientAddress: {
        create: {
          street: '46 Abbey Row',
          city: 'Cambridge',
          postCode: 'CB5 6EG',
          country: 'United Kingdom',
        },
      },
      invoiceItems: {
        createMany: {
          data: [
            {
              name: 'New Logo',
              quantity: 1,
              price: 1532.33,
              total: 1532.33,
            },
            {
              name: 'Brand Guidelines',
              quantity: 1,
              price: 2500.0,
              total: 2500.0,
            },
          ],
        },
      },
    },
  });
  await client.invoice.create({
    data: {
      issueDate: new Date('2021-10-01'),
      paymentDue: new Date('2021-10-31'),
      description: 'Landing Page Design',
      paymentTerms: 30,
      clientName: 'Thomas Wayne',
      clientEmail: 'thomas@dc.com',
      status: 'PENDING',
      total: 6155.91,
      senderAddress: {
        create: {
          street: '19 Union Terrace',
          city: 'London',
          postCode: 'E1 3EZ',
          country: 'United Kingdom',
        },
      },
      clientAddress: {
        create: {
          street: '3964  Queens Lane',
          city: 'Gotham',
          postCode: '60457',
          country: 'United States of America',
        },
      },
      invoiceItems: {
        createMany: {
          data: [
            {
              name: 'Web Design',
              quantity: 1,
              price: 6155.91,
              total: 6155.91,
            },
          ],
        },
      },
    },
  });
  await client.invoice.create({
    data: {
      issueDate: new Date('2021-11-05'),
      paymentDue: new Date('2021-11-12'),
      description: 'Logo Re-design',
      paymentTerms: 7,
      clientName: 'Anita Wainwright',
      clientEmail: '',
      status: 'DRAFT',
      total: 3102.04,
      senderAddress: {
        create: {
          street: '19 Union Terrace',
          city: 'London',
          postCode: 'E1 3EZ',
          country: 'United Kingdom',
        },
      },
      clientAddress: {
        create: {
          street: '',
          city: '',
          postCode: '',
          country: '',
        },
      },
      invoiceItems: {
        createMany: {
          data: [
            {
              name: 'Logo Re-design',
              quantity: 1,
              price: 3102.04,
              total: 3102.04,
            },
          ],
        },
      },
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(0); // Exit with 0 to make sure seed always success
  })
  .finally(async () => {
    await client.$disconnect();
  });
