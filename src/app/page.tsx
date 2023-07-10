import styles from './page.module.css';
import Map from './map';

async function getData() {
  // TODO: rapid refresh of cache, for now -- don't forget to update
  const res = await fetch('http:localhost:4000/map/39', {
    next: { revalidate: 3 },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const body = JSON.parse(await res.text());

  const sector = body.sector;
  const plants = body.plants;

  return { sector, plants };
}

export default async function Home() {
  const { sector, plants } = await getData();

  console.log(plants[0]);

  return (
    <main className={styles.main}>
      <Map sector={sector} plants={plants} />
    </main>
  );
}
