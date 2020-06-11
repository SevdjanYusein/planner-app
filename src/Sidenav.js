import React, { Component } from "react";

import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import MaterialIcon from 'material-icons-react';

import image1 from "./user.jpg";

class Sidenav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuList: [
        { id: "all", title: "All", status: "", icon: "mail_outline" },
        { title: "Filters" },
        { id: "starred", title: "Starred", status: "", icon: "star_border" },
        { id: "priority", title: "Priority", status: "", icon: "info_outline" },
        { id: "scheduled", title: "Scheduled", status: "", icon: "watch_later" },
        { id: "today", title: "Today", status: "", icon: "date_range" },
        { id: "done", title: "Done", status: "", icon: "check" },
        { id: "delete", title: "Delete", status: "", icon: "delete" },
        { title: "Department" },
        { id: "api", title: "API", status: "", icon: "fiber_manual_record", color:"#aa00ff" },
        { id: "paypal", title: "Paypal", status: "", icon: "fiber_manual_record", color:"#ffd600" },
        { id: "invoice", title: "Invoice", status: "", icon: "fiber_manual_record", color:"#00c853 " }
      ]
    };
  }

  componentDidMount() {    
    const options = {
      inDuration: 250,
      outDuration: 200,
      draggable: false
    };

    M.Sidenav.init(this.Sidenav, options);
  }

  selectItem = (event) => {
    const { menuList } = this.state;
    menuList.forEach(item => (item.status= ""));
    
    const selectedItemIndex = menuList.findIndex(item => (item.id === event.target.id));
    menuList[selectedItemIndex].status = "active";
    this.setState({ menuList });
  }

  render() {
    const { menuList } = this.state;

    return (
      <div>
        <ul className="sidenav sidenav-fixed">
          <li>
            <div className="user-view">
              <div className="img-background background"></div>
              <a href="#user">
                <img className="circle" alt="" src={image1} />
              </a>
              <a href="#name">
                <span className="white-text name">Rose Doe</span>
              </a>
              <a href="#email">
                <span className="white-text email">jdandturk@gmail.com</span>
              </a>
            </div>
          </li>
          {menuList.map((item, index) => (
            item.id
              ? <li>
                <a key={index} id={item.id} href="#!" className={item.status} onClick={this.selectItem}>
                  <MaterialIcon icon={item.icon} size="20" color={item.color} />
                  {item.title}
                </a>
              </li>
              : <li key={index} className="sidebar-title">{item.title}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Sidenav;
