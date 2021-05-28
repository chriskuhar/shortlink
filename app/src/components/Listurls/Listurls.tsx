import { listenerCount } from 'process';
import React from 'react';
import { isTemplateLiteralTypeSpan } from 'typescript';
import styles from './Listurls.module.scss';

interface Ilist {
  id: number;
  url: string;
  tinyurl: string;
}
export default class Listurls extends React.Component<{}> {

  constructor(props: any) {
    super(props);
    this.submit = this.submit.bind(this);
    this.state.success = false;
  }

  state = {
    list: [],
    newurl: '',
    success: false,
    error: false,
    value: ''
  };

  componentDidMount() {
    this.loadUrls();
  }

  loadUrls() {
    fetch('http://localhost:5000/tinyurls')
      .then(res => res.json())
      .then((result) => {
        this.setState({list: result})
      })
  }

  handleDelete(item: Ilist) {
    this.setState({success: false});
    this.setState({error: false});
    const options = {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const that = this;

    fetch('http://localhost:5000/tinyurls/' + item.id, options)
      .then((result) => {
        console.log(result);

        let newarr = that.state.list.filter((elt: Ilist) => {return elt.id !== item.id});
        that.setState({list: newarr});
    })
  }

  handleChange(e: any) {
    const value = e.target.value;
    this.setState({success: false});
    this.setState({error: false});
    this.setState({newurl: value});
  }

  submit() {
    this.setState({success: false});
    this.setState({error: false});

    const data = {
      url: encodeURI(this.state.newurl)
    }

    const options = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body:  JSON.stringify(data)
    }

    fetch('http://localhost:5000/tinyurls', options)
      .then((result) => {
        if(result.status === 200) {
          this.setState({success: true});
          this.setState({value: ''});
          this.loadUrls();
        } else {
          console.log(result.body);
          this.setState({error: true});
        }
      })
  }

  render() {
    return (
      <div className={styles.Listurls} data-testid="Listurls">
        <input placeholder='Enter URL' key='addUrl' type="text" onChange={(e) => this.handleChange(e)} />
        <button onClick={this.submit} name="action" className={styles.button}>Save URL</button>
        {this.state.success && <span className={styles.success}> Save Success</span>}
        {this.state.error && <span className={styles.error}>Duplicate Entery</span>}
        <div>
          <ul>
            {this.state.list.map((item: Ilist, idx) => (
              <div>
                <li key={idx}><span onClick={() => this.handleDelete(item)} className={styles.redText}>X</span><a className={styles.actualLink} href={item.tinyurl} target="_blank">{item.url}</a></li>
                <li><span className={styles.shortLink}>[{item.tinyurl}]</span></li>
              </div>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
