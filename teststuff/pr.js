function findmailOrUsername(input){
    const pattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/
    if(pattern.test(input)){
        return true
    }
    return false

}
// console.log(findmailOrUsername("bhushanjadhav1611@gmail.com"))
const data  = {
  "_id": {
    "$oid": "69898fd751ce788900900aa5"
  },
  "title": "AI Mod-2.pdf",
  "fileUrl": "http://res.cloudinary.com/dytvq9puh/raw/upload/v1770622935/notes/f21b2614e22d0afe621effcdb0161ff9",
  "cloudinaryId": "b7feb258e30905b1f28d89382fcc4933",
  "public_id": "notes/f21b2614e22d0afe621effcdb0161ff9",
  "type": "notes",
  "subject": "ai",
  "createdAt": {
    "$date": "2026-02-09T07:42:15.470Z"
  },
  "updatedAt": {
    "$date": "2026-02-09T07:42:15.470Z"
  },
  "__v": 0
}

// console.log( data['createdAt']['$date'] )
const d = new Date()
console.log(d)