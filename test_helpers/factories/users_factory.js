export default function (factory, Models) {
  factory.define('users', Models.users, {
    id: factory.sequence('users.id', (n) => `${n}`),
    first_name: factory.sequence('users.first_name', (n) => `First${n}`),
    last_name: factory.sequence('users.first_name', (n) => `Last${n}`),
    email: factory.seq('users.email', (n) => `user${n}@ymail.com`),
    age: 21,
    created_at: () => new Date(),
  });
};
