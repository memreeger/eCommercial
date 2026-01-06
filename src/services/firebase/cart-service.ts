import { doc, setDoc, deleteDoc, getDocs, collection } from "firebase/firestore";
import type { Product } from "../../views/e-commerce/types/product";
import { db } from "./firebase";

export type FirebaseCartItem = Product & { quantity: number };

export const addOrUpdateCartProduct = async (
    uid: string,
    item: FirebaseCartItem
) => {
    const ref = doc(db, "users", uid, "cartProducts", item.id.toString());
    await setDoc(ref, {
        title: item.title,
        price: item.price,
        image: item.image,
        quantity: item.quantity,
    });
};

export const removeCartProduct = async (uid: string, productId: number) => {
    const ref = doc(db, "users", uid, "cartProducts", productId.toString());
    await deleteDoc(ref);
};

export const getCartProducts = async (uid: string): Promise<FirebaseCartItem[]> => {
    const col = collection(db, "users", uid, "cartProducts");
    const snap = await getDocs(col);

    return snap.docs.map(doc => ({
        id: Number(doc.id),
        title: doc.data().title ?? "",
        price: doc.data().price ?? 0,
        image: doc.data().image ?? "",
        quantity: doc.data().quantity ?? 1,
        description: "",
    }));
};
