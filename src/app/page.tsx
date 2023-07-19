import styles from './page.module.css';
import Map from './components/Map';
import InfoPanel from './components/InfoPanel';

async function getData() {
  // TODO: rapid refresh of cache, for now -- don't forget to update
  const res = await fetch('http:localhost:4000/map/', {
    next: { revalidate: 3 },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const body = JSON.parse(await res.text());

  const sectors = body.sectors;
  const plants = body.plants;

  return { sectors, plants };
}

export default async function Home() {
  const { sectors, plants } = await getData();
  return (
    <main className={styles.main}>
      <Map sectors={sectors} plants={plants} />
    </main>
  );
}
