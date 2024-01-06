import { Component } from 'react';
import './Autoreport.css';

class Autoreport extends Component
{
  constructor()
  {
    super();//why constructor/super?
    this.state =
    {
      machinesData: []
    };
  }

  componentDidMount()
  {
    fetch('/autoreport',
    {
      method: 'GET'
    })
    .then(response => response.json())
    .then(fetchedData => this.setState({ machinesData: JSON.parse(fetchedData) }))
    .catch(error => console.log(error));
    //need to fix the abort on page swap
    setTimeout(() => console.log(this.state.machinesData), 2500);
  }

  render()
  { 
    return (
      <div className="autoreport">
        <table className="autoreportTable">
          <tbody>
            <tr className="autoreportTableHead" key={0}>
              <td>Stroj</td>
              <td>Id</td>
              <td>Deluje</td>
              <td>Alarm</td>
              <td>Unix Time</td>
              <td>Datum</td>
            </tr>
            {this.state.machinesData.map((podatki, index) =>
            ( 
              podatki[1].map((i, index) =>
              (
                <tr key={index+1}>
                  <td>{podatki[0]}</td>
                  <td>{i.id}</td>
                  <td>{i.deluje}</td>
                  <td>{i.alarm}</td>
                  <td>{i.unix_timestamp}</td>
                  <td>{i.readable_time.replaceAll('-', '/').replace('T', ' ').slice(0, 19)}</td>
                </tr>
              ))
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
        
export default Autoreport;