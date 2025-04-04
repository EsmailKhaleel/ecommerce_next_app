import styles from './users.module.css';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
}

async function getUsers(): Promise<User[]> {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
}

export default async function UsersPage() {
  const users = await getUsers();
  console.log('Fetched users:', users);
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Users Directory</h1>
      <div className={styles.grid}>
      {users.map((user) => (
          <div key={user.id} className={styles.card}>
            <h2 className={styles.userName}>{user.name}</h2>
            <div className={styles.userInfo}>
              <h3>Basic Information</h3>
              <p><strong>Username:</strong> {user.username}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Phone:</strong> {user.phone}</p>
              <p><strong>Website:</strong> {user.website}</p>

              <h3>Address</h3>
              <p><strong>Street:</strong> {user.address.street}</p>
              <p><strong>Suite:</strong> {user.address.suite}</p>
              <p><strong>City:</strong> {user.address.city}</p>
              <p><strong>Zipcode:</strong> {user.address.zipcode}</p>
              <p><strong>Location:</strong> ({user.address.geo.lat}, {user.address.geo.lng})</p>

              <h3>Company</h3>
              <p><strong>Name:</strong> {user.company.name}</p>
              <p><strong>Catch Phrase:</strong> {user.company.catchPhrase}</p>
              <p><strong>BS:</strong> {user.company.bs}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}