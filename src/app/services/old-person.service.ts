import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { OldPerson } from '../model/old-person';

@Injectable({
  providedIn: 'root'
})
export class OldPersonService {

  constructor(private firestore: Firestore) { }

  async addOldPerson(oldPerson: OldPerson) {
    try {
      const docRef = await addDoc(collection(this.firestore, "oldPersons"), oldPerson);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  getOldPersons(): Observable<OldPerson[]> {
    return collectionData(collection(this.firestore, 'oldPersons'), {idField: 'oldPersonId'}) as Observable<OldPerson[]>;
  }

  async deleteOldPerson(id: string) {
    await deleteDoc(doc(this.firestore, `oldPersons/${id}`));
  }

  async updateOldPerson(oldPerson: OldPerson) {
    await setDoc(doc(this.firestore, `oldPersons/${oldPerson.oldPersonId}`), oldPerson);
    
  }

  getOldPerson(id: string): Observable<OldPerson> {
    return docData(doc(this.firestore, `oldPersons/${id}`), {idField: 'oldPersonId'}) as Observable<OldPerson>;
  }
}
