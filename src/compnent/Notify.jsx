import React from "react"
import Swal from "sweetalert2";

 export const notify = (Icon, Title, Text) => {
 Swal.fire({
    icon: Icon,
    title: Title,
    text: Text,
    timer:5000,
    showConfirmButton: false
 })
};
 export const notifyconfirm = (Icon, Title, Text, Bool) => {
 Swal.fire({
    icon: Icon,
    title: Title,
    text: Text,
    showConfirmButton: Bool
 })
};
export const toast = (Icon, Title, Text) => {
 Swal.fire({
    icon: Icon,
    position:'top-end',
    title: Title,
    text: Text,
    toast:true,
    timerProgressBar:true,
    timer:10000,
    showConfirmButton:false,
  
 })
};

