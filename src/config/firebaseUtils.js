import firebase from "firebase/app"; 

export function flattenDoc(doc) {
    return {id: doc.id, ...doc.data() }
}

export function db() {
    return firebase.firestore();
}