
exports.up = (pgm) => {
  pgm.createTable("posts", {
    id: "id",
    title: { type: "varchar(200)", notNull: true },
    content: { type: "text", notNull: true },
    tag: { type: "varchar(50)", notNull: true }, // np. 'zgubione', 'hałas'
    created_at: { type: "timestamptz", notNull: true, default: pgm.func("now()") },
  });

  pgm.createTable("comments", {
    id: "id",
    post_id: { type: "integer", notNull: true, references: "posts", onDelete: "cascade" },
    content: { type: "text", notNull: true },
    created_at: { type: "timestamptz", notNull: true, default: pgm.func("now()") },
  });

  pgm.createTable("sidebar_items", {
    id: "id",
    type: { type: "varchar(20)", notNull: true }, // 'phone' | 'faq' | 'link'
    label: { type: "varchar(120)", notNull: true },
    value: { type: "varchar(300)", notNull: true },
    sort_order: { type: "integer", notNull: true, default: 0 },
  });

  pgm.createIndex("posts", ["created_at"]);
  pgm.createIndex("comments", ["post_id", "created_at"]);
  pgm.createIndex("sidebar_items", ["type", "sort_order"]);
};

exports.down = (pgm) => {
  pgm.dropTable("sidebar_items");
  pgm.dropTable("comments");
  pgm.dropTable("posts");
};
