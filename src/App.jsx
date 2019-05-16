import React from 'react';


function searchingFor(term){
  return function(x){
    return x.branch.toLowerCase().includes( term.toString().toLowerCase()) || x.bank_name.toLowerCase().includes( term.toString().toLowerCase()) || !term.toString() ;
  }
}

class App extends React.Component{
  constructor(props){
    super(props);

    this.state={
      items:[],
      isLoaded:false,
    }
    this.searchHandler = this.searchHandler.bind(this);
  }

  componentDidMount(){
    fetch('https://vast-shore-74260.herokuapp.com/banks?city=MUMBAI')
    .then(res=>res.json())
    .then(json=>{
      this.setState({
        isLoaded:true,
        items: json ,
      })
      
    });
  }
  searchHandler(event){
    this.setState({ isLoaded : event.target.value });
  }
   renderTableHeader() {
      let header = Object.keys(this.state.items[0])
      return header.map((key, index) => {
         return <th key={index}>{key.toUpperCase()}</th>
      })
   }
  

  render(){
    var { isLoaded, items} =this.state;
    if(!isLoaded){
      return <div><p>Loading..</p></div>

    }

    else{
      return(
      <div className="App">
        <form>
           <input type="text"
                  onChange={this.searchHandler}
                
                   />       
           
        </form>
        {
          
         items.filter(searchingFor(isLoaded)).map(item =>
           <table>
            <tbody>
             <tr>{this.renderTableHeader()}</tr>
             <tr id="students" key={item.ifsc}>
               <td id="students">{item.ifsc}</td>
               <td id="students">{item.bank_id}</td>
               <td id="students">{item.branch}</td>
               <td id="students">{item.address}</td>
               <td id="students">{item.city}</td>{'  '}
               <td id="students">{item.district}</td>{'  '}
               <td id="students">{item.state}</td>{'  '}
               <td id="students">{item.bank_name}</td>
            }
            </tr>
            </tbody>
        </table>
         )

      }
      </div>
      );
    }
  }

}
 export default App;