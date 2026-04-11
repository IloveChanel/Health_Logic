import requests

class BarcodeService:
    def lookup(self, barcode):
        url = f"https://world.openfoodfacts.org/api/v0/product/{barcode}.json"
        res = requests.get(url).json()
        if res.get("status") == 1:
            return res["product"]
        return None
