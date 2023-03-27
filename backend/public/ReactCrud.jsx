var  KidsAll = React.createClass({

    getInitialState:function(){
        return{
            name:"",
            age:"",
            pickupTime:"",
            guardianName:"",
            id:"",
            Buttontxt:"Save",
            data1:[]
        }
    },

    componentDidMount(){
        $.ajax({
            url:'api/getdata',
            methof:'GET',
            dataType:'json',
            ContentType:'aplication/json',
            success:function(data){
                this.setState({data1:data})
            }.bind(this),
            error:function(xhr){
                console.log(xhr)
            }.bind(this)
        })

    },

    handleClick(){
        let url = ""
        if(this.state.Buttontxt == "Save"){
            url = "/api/savedata"
        }
        let kidsData = {
            'name':this.state.name,
            'age':this.state.age,
            'pickupTime':this.state.pickupTime,
            'guardianName':this.state.guardianName,
            'id':this.state.id
        }

        $.ajax({
            url:url,
            dataType:'json',
            type:'POST',
            data:kidsData,
            success:function(data){
                this.setState(this.getinitialState())
                this.componentDidMount()
            }.bind(this),
            error:function(xhr,status,err){
                alert(err)
            }.bind(this)
        })
    },

    handleChange(e){
        this.setState({[e.target.name]:e.target.value})
    },

    render:function(){
        return(
            <div className="container" style={{marginTop:'50px'}}>
                <p className="text0center" style={{fontSize:'25px'}}><b>
                    CRUD APP WITH MONGODB
                </b></p>
                <form>
                    <div className="col-sm-12 col-md-12"
                    style={{marginLeft:'10px'}}>
                        <table className="table-bordered">
                            <tbody>
                                <tr>
                                    <td><b>Name</b></td>
                                    <td>
                                        <input name="name" onChange={this.handleChange} value={this.state.name} className="form-control" type="text"/>
                                        <input value={this.state.id} type="hidden" name="id"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td><b>Age</b></td>
                                    <td>
                                        <input name="age"onChange={this.handleChange} value={this.state.age} className="form-control" type="text"/>
                                        <input type="hidden" name="id"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td><b>Pickup Time</b></td>
                                    <td>
                                        <input name="pickupTime" onChange={this.handleChange} value={this.state.pickupTime} className="form-control" type="text"/>
                                        <input type="hidden" name="id"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td><b>Parent/Guardian</b></td>
                                    <td>
                                        <input name="guardianName" onChange={this.handleChange} value={this.state.guardianName} className="form-control" type="text"/>
                                        <input type="hidden" name="id"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>
                                        <input onclick={this.handleClick} value={this.state.Buttontxt} className="btn btn-primary" type="button"/>
                                    </td>
                                </tr>


                            </tbody>
                        </table>
                    </div>
                    <div className="col-sm-12 col-md-12" style={{marginTop:'50px'}}>
                        <table className="table-bordered">
                            <tbody>
                                <tr>
                                    <th>
                                        S.No
                                    </th>
                                    <th>
                                        Name
                                    </th>
                                    <th>
                                        Age
                                    </th>
                                    <th>
                                        Pickup Time
                                    </th>
                                    <th>
                                        Guardian Name
                                    </th>
                                    <th>
                                        Edit Data
                                    </th>
                                    <th>
                                        Delete
                                    </th>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                </form>
            </div>
        )
    }
})

ReactDOM.render(<KidsAll/>,document.getElementById('root'))