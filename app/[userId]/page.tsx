"use client"
import React, { useEffect, useState } from 'react'
import app from '../firebase'
import UserInfo from './../components/UserInfo'
import { collection, getDocs, getDoc, doc, getFirestore, query, where } from 'firebase/firestore'
import PinList from './../components/Pins/PinList'

// @ts-ignore
function Profile({ params }) {
    const db = getFirestore(app);
    const [userInfo, setUserInfo] = useState();
    const [listOfPins, setListOfPins] = useState([]);
    useEffect(() => {
        console.log(params.userId.replace('%40', '@'))
        if (params) {
            getUserInfo(params.userId.replace('%40', '@'))
        }
    }, [params]);

    // @ts-ignore
    const getUserInfo = async (email) => {
        const docRef = doc(db, "user", email);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            // @ts-ignore
            setUserInfo(docSnap.data())
        } else {
            console.log("No such document!");
        }
    }

    useEffect(() => {
        if (userInfo) {
            getUserPins();
        }
    }, [userInfo])

    const getUserPins = async () => {
        setListOfPins([])
        // @ts-ignore
        const q = query(collection(db, 'pinterest-post'), where("email", '==', userInfo.email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // @ts-ignore
            setListOfPins(listOfPins => [...listOfPins, doc.data()]);
        });
    }

    return (
        <div>
            {userInfo ?
                <div>
                    <UserInfo userInfo={userInfo} />
                    <PinList listOfPins={listOfPins} />
                </div>
                :
                null
            }
        </div>
    )
}

export default Profile