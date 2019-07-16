import React,{ Component } from 'react';
import Datatable from './Datatable';
import './App.css';
const appsettings= [
  {
      "id": 5,
      "subject": "ASub",
      "topic": "Itopic",
      "description": " "
  },
  {
      "id": 13,
      "subject": "BSub",
      "topic": "Htopic",
      "description": " "
  },
  {
      "id": 30,
      "subject": "CSub",
      "topic": "Gtopic",
      "description": "Description1"
  },
  {
      "id": 6,
      "subject": "DSub",
      "topic": "Ftopic",
      "description": ""
  },
  {
      "id": 7,
      "subject": "ESub",
      "topic": "Etopic",
      "description": "Description2"
  },
  {
      "id": 37,
      "subject": "FSub",
      "topic": "Dtopic",
      "description": "desc"
  },
  {
      "id": 36,
      "subject": "GSub",
      "topic": "Ctopic",
      "description": "New Description"
  },
  {
      "id": 11,
      "subject": "HSub",
      "topic": "Btopic",
      "description": "Description"
  },
  {
      "id": 35,
      "subject": "ISub",
      "topic": "Atopic",
      "description": " "
  }
];

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      appsettings,
      currentId:null
    }
}
edit=(id)=>{
  alert('edit button works:'+id);
}
delete=(id)=>{
  alert('delete button works:'+id);
}

  render(){
   
    return (
      <div className="App">
        <header className="App-header">
          <h1><center>Datatable</center></h1>
        {(appsettings!=null)?
                                  <Datatable 
                                  tableHeader={['Subject','Topic','Description']} 
                                  rowData={appsettings} 
                                  fieldName={['subject','topic','description']}
                                  xLNeed={true}
                                  xLTitle={"SUBJECTS"} xLFieldHeader={['Subject','Topic','Description']}
                                  xLFieldName={['subject','topic','description']}
                                  deleteFn={this.delete} editFn={this.edit}
                                  deleteFnNeed={true} editFnNeed={true} deleteFnClass={"fa fa-trash"} editFnClass={"fa fa-edit"} 
                                  />:null
                              }
                              
        </header>
      </div>
    );
  }

}

export default App;
