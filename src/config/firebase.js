// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";

import { toast } from "react-toastify";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCIf-53InfEXIy9QNsEQyVrujWS12Wy4Po",
  authDomain: "chat-app-gs-8ce17.firebaseapp.com",
  projectId: "chat-app-gs-8ce17",
  storageBucket: "chat-app-gs-8ce17.appspot.com",
  messagingSenderId: "83189029855",
  appId: "1:83189029855:web:6a0934448cca0d7d6e026a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (username,email,password) => {
    try {
        const res = await  createUserWithEmailAndPassword(auth,email,password);
        const user = res.user;
        await setDoc(doc(db,"users",user.uid),{
            id:user.uid,
            usernmae:username.toLowerCase(),
            email,
            name:"",
            avatar:"",
            bio:"Hey, There i am using chat app",
            lastSeen:Date.now()

        })
        await setDoc(doc(db,"chats" , user.uid),{
            chatData:[]
        })

    }catch(error){
        console.error(error)
        toast.error(error.code.split('/')[1].split('-').join(" "));


    }

}

const login = async (email,password) =>{
    try{
        await signInWithEmailAndPassword(auth,email,password);

    }catch(error){
        console.error(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));

    }

}
const logout = async () => {
    try {
        await signOut(auth)
        
    } catch (error) {
        console.error(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
        
    }
    
    
    
}

export {signup,login,logout,auth,db}

