import { doc, setDoc, deleteDoc, getDocs, collection } from "firebase/firestore";
import type { Product } from "../../views/e-commerce/types/product";
import { db } from "./firebase";

// FAVORİ EKLE
export const addFavorite = async (uid: string, product: Product) => {
    const favRef = doc(db, "users", uid, "favorites", product.id.toString());

    await setDoc(favRef, {
        title: product.title,
        price: product.price,
        image: product.image,
    });
};

// FAVORİ SİL
export const removeFavorite = async (uid: string, productId: number) => {
    const favRef = doc(db, "users", uid, "favorites", productId.toString());
    await deleteDoc(favRef);
};

// FAVORİLERİ GETİR
export const getFavorites = async (uid: string) => {
    const favCol = collection(db, "users", uid, "favorites");
    const snapshot = await getDocs(favCol);

    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
    }));
};
