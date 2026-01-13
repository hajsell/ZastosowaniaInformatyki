exports.up = async (pgm) => {
  await pgm.sql(`
    INSERT INTO category (name, slug, icon) VALUES 
    ('Elektronika', 'elektronika', 'laptop'),
    ('Motoryzacja', 'motoryzacja', 'car'),
    ('Nieruchomości', 'nieruchomosci', 'home'),
    ('Dom i Ogród', 'dom-i-ogrod', 'flower-2'),
    ('Praca', 'praca', 'briefcase'),
    ('Moda', 'moda', 'shirt'),
    ('Inne', 'inne', 'package');
  `);

  await pgm.sql(`
    INSERT INTO users (name, email, password_hash) VALUES 
    ('Tester', 'test@test.pl', '$2b$10$K9p./O1R/H0k8kK1R0Y1ue7L1abc');
  `);

  const cities = ['Kraków', 'Warszawa', 'Wrocław', 'Gdańsk', 'Poznań'];
  const titles = ['iPhone 13', 'Rower szosowy', 'Mieszkanie 2-pokojowe', 'Monitor 4K', 'Kurtka skórzana', 'Praca dla studenta', 'Stół dębowy', 'Opony letnie'];

  for (let i = 1; i <= 20; i++) {
    const title = titles[i % titles.length] + " #" + i;
    const city = cities[Math.floor(Math.random() * cities.length)];
    const price = Math.floor(Math.random() * 4000) + 100;
    const catId = Math.floor(Math.random() * 7) + 1;

    await pgm.sql(`
      INSERT INTO posts (user_id, category_id, title, content, price, city, status)
      VALUES (1, ${catId}, '${title}', 'To jest opis ogłoszenia numer ${i}. Stan bardzo dobry, polecam kontakt.', ${price}, '${city}', 'active');
    `);

    const imgName = `image_${i}.jpg`; 
    await pgm.sql(`
      INSERT INTO images (post_id, image_path)
      VALUES (${i}, '${imgName}');
    `);
  }
};

exports.down = (pgm) => {
  pgm.sql('TRUNCATE images, posts, users, category RESTART IDENTITY CASCADE;');
};