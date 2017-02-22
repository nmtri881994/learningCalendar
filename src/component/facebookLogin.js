/**
 * Created by XuanVinh on 2/18/2017.
 */
import React, {Component} from 'react'
import FacebookLogin from 'react-facebook-login'
import * as SocialAPI from '../apiUtility/socialApi'
import FacebookProvider, { Login, Like, Share, EmbeddedPost, Comments , ShareButton } from 'react-facebook';

class FaceBookLogin extends Component{
    constructor(props){
        super(props);
        this.onFacebookResponse = this.onFacebookResponse.bind(this);
    }

    onFacebookResponse(data, user_data) {
        console.log(data);
        console.log(user_data);
    }

    render(){
        return(<div>
            <div className="fb-like" data-href="https://www.facebook.com/nhanlongvoivongtayphongthuytramhuong/" data-layout="standard" data-action="like" data-size="small" data-show-faces="true" data-share="true"></div>
        </div>);
    }

}

export default FaceBookLogin;