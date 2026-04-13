import Database from "better-sqlite3"

const db = new Database("healthlogic_cache.db")

db.prepare(`
CREATE TABLE IF NOT EXISTS product_cache(
  barcode TEXT PRIMARY KEY,
  data TEXT
)
`).run()

export function saveProduct(barcode:string,data:any){
  db.prepare(
    "INSERT OR REPLACE INTO product_cache(barcode,data) VALUES(?,?)"
  ).run(barcode, JSON.stringify(data))
}

export function getProduct(barcode:string){
  const row:any = db.prepare(
    "SELECT data FROM product_cache WHERE barcode=?"
  ).get(barcode)

  return row ? JSON.parse(row.data) : null
}
