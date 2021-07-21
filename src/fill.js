import $ from 'jquery'
import { data1398 } from "./webpack.static.bundle";

$(window).load(() => {
    $("button.MuiFab-root:contains('Fill')").click(() => {
        const { e, a, t } = data1398
        window["webpackJsonpwl-test"][1][1][1398]( e, a, t )
    })
})

export function isValid(inputName, value, checkForm) {
   if (!checkForm) return false

   switch(inputName) {
       case 'name': {
           if (Boolean(value)) {
               return false
           }

           return true
       }
       case 'email': {
           const test = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)

           if (test || value === '') {
               return false
           }

           return true
       }
       case 'phone1': {
           if (value === '') {
               return false
           }

           if (isValidPhone(value)) {
               return true
           }

           return false
       }
       case 'phone2': {
           if (value === '') {
               return false
           }

           if (isValidPhone(value)) {
               return true
           }

           return false
       }
       case 'desc': {
           if (Boolean(value) || value === '') {
               return false
           }

           return true
       }
   }

   return true
}

function isValidPhone(phoneNumber) {
    const res = phoneNumber.split('').map(num => parseInt(num)).filter(num => num + 1)
    return res.length < 10
}
