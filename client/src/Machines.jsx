  import { Component } from 'react';
import './Machines.css';

class Machines extends Component
{
  constructor()
  {
    super();//why constructor/super?
    this.state =
    {
      names: [],
      machineData: []
    };    
  }

  componentDidMount()
  {
    fetch('/machines',
    {
      method: 'GET'
    })
    .then(response => response.json())
    .then(fetchedData => this.setState({ names: JSON.parse(fetchedData) }))
    .catch(error => console.log(error));
    //need to fix the abort on page swap
    setTimeout(() => console.log(this.state.names), 2500);
  }

  handleClick(event, machineName)
  {
    fetch('/machinesData',
    {
      method: 'POST',//machineName is already a string, do I really need to JSON it?
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({machineName})
    })
    .then(response => response.json())
    .then(fetchedData => this.setState({ machineData: JSON.parse(fetchedData) }))
    .catch(error => console.log(error));
    //need to fix the abort on page swap
    setTimeout(() => console.log(this.state.machineData), 2500);
  }

  render()
  { 
    return (
      <div className="machines">
        
        {this.state.names.map((machineName, index) =>
          <button
            className="machinesButton"
            key={index}
            onClick={(event) => this.handleClick(event, machineName)}>
            {machineName}
          </button>)
        }

        <table className="machinesTable">
          <tbody>
            <tr className="machinesTableHead"
                key={0}>
              <td>Stroj</td>
              <td>Id</td>
              <td>Deluje</td>
              <td>Alarm</td>
              <td>Unix Time</td>
              <td>Datum</td>
            </tr>
            {this.state.machineData.map((data, index) =>
            (
              <tr key={index+1}>
                <td>{data.ime}</td>
                <td>{data.id}</td>
                <td>{data.deluje}</td>
                <td>{data.alarm}</td>
                <td>{data.unix_timestamp}</td>
                <td>{data.readable_time.replaceAll('-', '/').replace('T', ' ').slice(0, 19)}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    );
  }
}
        
export default Machines;