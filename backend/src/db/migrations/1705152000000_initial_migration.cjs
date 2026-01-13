exports.up = (pgm) => {
  pgm.createTable("category", {
    id: "id",
    name: { type: "varchar(100)", notNull: true },
    icon: { type: "varchar(50)" },
    slug: { type: "varchar(100)", notNull: true, unique: true },
  });

  pgm.createTable("users", {
    id: "id",
    name: { type: "varchar(100)", notNull: true },
    password_hash: { type: "varchar(255)", notNull: true },
    phone_number: { type: "varchar(20)" },
    email: { type: "varchar(150)", notNull: true, unique: true },
    is_active: { type: "boolean", notNull: true, default: true },
    created_at: { type: "timestamptz", notNull: true, default: pgm.func("now()") },
  });

  pgm.createTable("posts", {
    id: "id",
    user_id: { 
      type: "integer", 
      notNull: true, 
      references: '"users"', 
      onDelete: "cascade" 
    },
    category_id: { 
      type: "integer", 
      notNull: true, 
      references: '"category"', 
      onDelete: "restrict" 
    },
    city: { type: "varchar(100)", notNull: true },
    title: { type: "varchar(200)", notNull: true },
    content: { type: "text", notNull: true },
    price: { type: "numeric(10, 2)", notNull: true },
    status: { type: "varchar(20)", default: "active" },
    views_count: { type: "integer", notNull: true, default: 0 },
    created_at: { type: "timestamptz", notNull: true, default: pgm.func("now()") },
  });

  pgm.createTable("images", {
    id: "id",
    post_id: { 
      type: "integer", 
      notNull: true, 
      references: '"posts"', 
      onDelete: "cascade" 
    },
    image_path: { type: "varchar(500)", notNull: true },
  });

  pgm.createIndex("posts", "user_id");
  pgm.createIndex("posts", "category_id");
  pgm.createIndex("images", "post_id");
};

exports.down = (pgm) => {
  pgm.dropTable("images");
  pgm.dropTable("posts");
  pgm.dropTable("users");
  pgm.dropTable("category");
};