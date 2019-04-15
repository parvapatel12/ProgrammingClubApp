import React, { Component } from "react";
import firebase from "firebase";

var c = 0;
var tags_arr = [];
var rating_per_tag = [];
var v_handle = "hiteshpardasani99";

var rat_arr = new Array();
var tag_dif_arr = [];
var solved = new Set();

var rating_per_tag = new Array();
var avg_rating = new Array();

// var config = {
//   apiKey: "AIzaSyAbKy_9ySKVg5LPBjcSl4opQWIZNkvrR8M",
//   authDomain: "temp-4d417.firebaseapp.com",
//   databaseURL: "https://temp-4d417.firebaseio.com",
//   projectId: "temp-4d417",
//   storageBucket: "temp-4d417.appspot.com",
//   messagingSenderId: "594613445600"
// };

// firebase.initializeApp(config);

class dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "easy",
      tag: "implementation",
      showMenu: false,
      got_data: false
    };
    this.showMenu = this.showMenu.bind(this);
    this.printValue = this.printValue.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.displayProblems = this.displayProblems.bind(this);

    this.getData();
  }

  async getData() {
    await firebase
      .database()
      .ref("/")
      .once("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          if (c == 0) {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();
            tags_arr = childData;
            console.log("--");
            console.log(childData);
            for (var x in childData) {
              rating_per_tag[x] = [];
            }
          }
          c = c + 1;
        });
      });
    console.log(tags_arr);

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      var txt = "";
      if (this.readyState == 4 && this.status == 200) {
        var json = JSON.parse(this.responseText);
        var submission = json.result;
        for (var x in submission) {
          if (submission[x]["verdict"] == "OK") {
            var te =
              String(submission[x]["problem"]["contestId"]) +
              String(submission[x]["problem"]["index"]);
            solved.add(te);
            for (var y in submission[x]["problem"]["tags"]) {
              var z = submission[x]["problem"]["tags"][y];
              //if(z=="dp"){console.log(submission[x]['problem']);}
              //console.log(y);
              var temp = rating_per_tag[z];
              //console.log(temp);
              //console.log(submission[x]['problem']['rating']);
              if (typeof submission[x]["problem"]["rating"] !== "undefined") {
                temp.push(submission[x]["problem"]["rating"]);
              }
              rating_per_tag[z] = temp;
            }
          }
        }
        console.log(solved);
        txt = txt + "-----" + "<br>";

        for (x in rating_per_tag) {
          var easy = [],
            medium = [],
            hard = [];
          txt = txt + x + ": ";
          var sum = 0;
          for (y in rating_per_tag[x]) {
            txt = txt + rating_per_tag[x][y] + ", ";
            sum = sum + rating_per_tag[x][y];
          }
          if (rating_per_tag[x].length == 0) {
            avg_rating[x] = 1500;
          } else {
            avg_rating[x] = sum / rating_per_tag[x].length;
          }
          avg_rating[x] = Math.round(avg_rating[x] / 100);
          txt = txt + "<br>";
          txt = txt + "Average Rating" + avg_rating[x] + "<br>";

          for (var y in tags_arr[x]) {
            var ex = tags_arr[x][y]["rating"] / 100;
            var te =
              String(tags_arr[x][y]["contestId"]) +
              String(tags_arr[x][y]["index"]);
            if (ex > avg_rating[x] + 1) {
              if (solved.has(te) != true) {
                hard.push(tags_arr[x][y]);
              }
            } else if (ex < avg_rating[x] - 1) {
              if (solved.has(te) != true) {
                easy.push(tags_arr[x][y]);
              }
            } else if (ex <= avg_rating[x] + 1 && ex >= avg_rating[x] - 1) {
              if (solved.has(te) != true) {
                medium.push(tags_arr[x][y]);
              }
            }
          }
          tags_arr["easy"] = easy;
          tags_arr["medium"] = medium;
          tags_arr["hard"] = hard;
          txt = txt + "Easy<br>";
          for (var y in rating_per_tag["easy"]) {
            txt =
              txt +
              tags_arr["easy"][y]["name"] +
              tags_arr["easy"][y]["rating"] +
              tags_arr["easy"][y]["link"] +
              "<br>";
          }
          txt = txt + "Medium<br>";
          for (var y in tags_arr["medium"]) {
            txt =
              txt +
              tags_arr["medium"][y]["name"] +
              tags_arr["medium"][y]["rating"] +
              tags_arr["medium"][y]["link"] +
              "<br>";
          }
          txt = txt + "Hard<br>";
          for (var y in tags_arr["hard"]) {
            txt =
              txt +
              tags_arr["hard"][y]["name"] +
              tags_arr["hard"][y]["rating"] +
              tags_arr["hard"][y]["link"] +
              "<br>";
          }
          tag_dif_arr[x] = {
            easy: easy,
            medium: medium,
            hard: hard
          };
        }
        console.log(tag_dif_arr);

        console.log("done");
        document.getElementById("demo").innerHTML = txt;
        var data = "";
        for (var x in tag_dif_arr["implementation"]["easy"]) {
          data = data + "<div id='problem'>";
          data =
            data +
            "Problem Name: " +
            tag_dif_arr["implementation"]["easy"][x]["name"] +
            "<br>";
          data =
            data +
            "Rating: " +
            tag_dif_arr["implementation"]["easy"][x]["rating"] +
            "<br>";
          data = data + "Tags: ";
          for (var y in tag_dif_arr["implementation"]["easy"][x]["tags"]) {
            var ny = parseInt(y);
            if (
              ny <
              tag_dif_arr["implementation"]["easy"][x]["tags"].length - 1
            ) {
              data =
                data +
                tag_dif_arr["implementation"]["easy"][x]["tags"][y] +
                ", ";
            } else {
              data =
                data +
                tag_dif_arr["implementation"]["easy"][x]["tags"][y] +
                "<br>";
            }
          }
          data =
            data +
            '<a href="' +
            tag_dif_arr["implementation"]["easy"][x]["link"] +
            '"> Solve </a><br>';
          data = data + "<br>";
          data = data + "</div>";
        }
        document.getElementById("demo").innerHTML = data;
      }
    };
    console.log("func start");
    //var v_handle = document.getElementById('handle').value;
    var url =
      "http://codeforces.com/api/user.status?handle=hiteshpardasani99&from=1&count=1000";
    await xhttp.open("GET", url, true);
    xhttp.send();
    this.state.gotdata = true;
  }

  showMenu(event) {
    event.preventDefault();
    this.setState({ showMenu: true }, () => {
      document.addEventListener("click", this.closeMenu);
    });
  }

  displayProblems() {
    var data = "";
    for (var x in tag_dif_arr[this.state.tag][this.state.type]) {
      data = data + "<div id='problem'>";
      data =
        data +
        "Problem Name: " +
        tag_dif_arr[this.state.tag][this.state.type][x]["name"] +
        "<br>";
      data =
        data +
        "Rating: " +
        tag_dif_arr[this.state.tag][this.state.type][x]["rating"] +
        "<br>";
      data = data + "Tags: ";
      for (var y in tag_dif_arr[this.state.tag][this.state.type][x]["tags"]) {
        var ny = parseInt(y);
        if (
          ny <
          tag_dif_arr[this.state.tag][this.state.type][x]["tags"].length - 1
        ) {
          data =
            data +
            tag_dif_arr[this.state.tag][this.state.type][x]["tags"][y] +
            ", ";
        } else {
          data =
            data +
            tag_dif_arr[this.state.tag][this.state.type][x]["tags"][y] +
            "<br>";
        }
      }
      //data=data+tag_dif_arr[this.state.tag][this.state.type][x]["tag"]+"<br>";
      data =
        data +
        '<a href="' +
        tag_dif_arr[this.state.tag][this.state.type][x]["link"] +
        '"> Solve </a><br>';
      data = data + "<br>";
      data = data + "</div>";
    }
    document.getElementById("demo").innerHTML = data;
  }

  selectTag = event => {
    this.setState({ tag: event.target.value });
    //console.log(this.state);
  };

  handleOptionChange = event => {
    this.setState({ type: event.target.value });
    //console.log(this.state);
  };

  handleFormSubmit = formSubmitEvent => {
    formSubmitEvent.preventDefault();
    console.log("You have submitted:", this.state.type);
  };

  closeMenu() {
    this.setState({ showMenu: false }, () => {
      document.removeEventListener("click", this.closeMenu);
    });
  }

  printValue() {
    console.log(this.state);
    console.log(tag_dif_arr[this.state.tag][this.state.type]);
  }

  render() {
    if (this.state.gotdata) {
      this.displayProblems();
    }
    return (
      <div className="container">
        <div className="row mt-5">
          <div className="col-sm-12">
            <form onSubmit={this.handleFormSubmit}>
              <div className="form-check">
                <label>
                  <input
                    type="radio"
                    name="react-tips"
                    value="easy"
                    checked={this.state.type === "easy"}
                    onChange={this.handleOptionChange}
                    className="form-check-input"
                  />
                  Easy
                </label>
              </div>
              <div className="form-check">
                <label>
                  <input
                    type="radio"
                    name="react-tips"
                    value="medium"
                    checked={this.state.type === "medium"}
                    onChange={this.handleOptionChange}
                    className="form-check-input"
                  />
                  Medium
                </label>
              </div>
              <div className="form-check">
                <label>
                  <input
                    type="radio"
                    name="react-tips"
                    value="hard"
                    checked={this.state.type === "hard"}
                    onChange={this.handleOptionChange}
                    className="form-check-input"
                  />
                  Hard
                </label>
              </div>
            </form>
          </div>
        </div>
        <button onClick={this.showMenu}>Tags</button>
        {this.state.showMenu ? (
          <div className="menu">
            <button onClick={this.selectTag} value="implementation">
              {" "}
              Implementation{" "}
            </button>
            <button onClick={this.selectTag} value="brute force">
              {" "}
              Brute Force{" "}
            </button>
            <button onClick={this.selectTag} value="data structures">
              {" "}
              Data Structures{" "}
            </button>
            <button onClick={this.selectTag} value="dp">
              {" "}
              Dynamic Programming{" "}
            </button>
            <button onClick={this.selectTag} value="binary search">
              {" "}
              Binary Search{" "}
            </button>
            <button onClick={this.selectTag} value="greedy">
              {" "}
              Greedy{" "}
            </button>
            <button onClick={this.selectTag} value="graphs">
              {" "}
              Graphs{" "}
            </button>
            <button onClick={this.selectTag} value="math">
              {" "}
              Math{" "}
            </button>
            <button onClick={this.selectTag} value="number theory">
              {" "}
              Number Theory{" "}
            </button>
            <button onClick={this.selectTag} value="strings">
              {" "}
              Strings{" "}
            </button>
            <button onClick={this.selectTag} value="sortings">
              {" "}
              Sortings{" "}
            </button>
            <button onClick={this.selectTag} value="trees">
              {" "}
              Trees{" "}
            </button>
            <button onClick={this.selectTag} value="dfs and similar">
              {" "}
              DFS and Similar{" "}
            </button>
            <button onClick={this.selectTag} value="geometry">
              {" "}
              Geometry{" "}
            </button>
            <button onClick={this.selectTag} value="two pointers">
              {" "}
              Two Pointers{" "}
            </button>
            <button onClick={this.selectTag} value="ternary search">
              {" "}
              Ternary Search{" "}
            </button>
            <button onClick={this.selectTag} value="probabilities">
              {" "}
              Probabilities{" "}
            </button>
            <button onClick={this.selectTag} value="matrices">
              {" "}
              Matrices{" "}
            </button>
            <button onClick={this.selectTag} value="dsu">
              {" "}
              DSU{" "}
            </button>
            <button onClick={this.selectTag} value="games">
              {" "}
              Games{" "}
            </button>
            <button onClick={this.selectTag} value="flows">
              {" "}
              Flows{" "}
            </button>
            <button onClick={this.selectTag} value="fft">
              {" "}
              Fast Fourier Transform{" "}
            </button>
            <button onClick={this.selectTag} value="divide and conquer">
              {" "}
              Divide and Conquer{" "}
            </button>
            <button onClick={this.selectTag} value="bitmasks">
              {" "}
              Bit Masking{" "}
            </button>
            <button onClick={this.selectTag} value="2-sat">
              {" "}
              2-Satisfiability{" "}
            </button>
            <button onClick={this.selectTag} value="combinatorics">
              {" "}
              Combinatorics{" "}
            </button>
            <button onClick={this.selectTag} value="constructive algorithm">
              {" "}
              Constructive Algorithm{" "}
            </button>
            <button onClick={this.selectTag} value="hashing">
              {" "}
              Hashing{" "}
            </button>
            <button onClick={this.selectTag} value="graph matchings">
              {" "}
              Graph Matchings{" "}
            </button>
            <button onClick={this.selectTag} value="meet-in-the-middle">
              {" "}
              Meet in the Middle{" "}
            </button>
            <button onClick={this.selectTag} value="string suffix stuctures">
              {" "}
              String suffix structures{" "}
            </button>
            <button onClick={this.selectTag} value="shortest paths">
              {" "}
              Shortest Paths{" "}
            </button>
            <button onClick={this.selectTag} value="schedules">
              {" "}
              Schedules{" "}
            </button>
            <button onClick={this.selectTag} value="expression parsing">
              {" "}
              Expression Parsing{" "}
            </button>
            <button onClick={this.selectTag} value="chinese remainder theorem">
              {" "}
              Chinese Remainder Theorem{" "}
            </button>
            <button onClick={this.selectTag} value="*special">
              {" "}
              Special{" "}
            </button>
          </div>
        ) : null}
        <div id="demo" />
      </div>
    );
  }
}

export default dashboard;
