import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import cookie from '../../../lib/cookie';
import { hot } from 'react-hot-loader/root'
import request from 'framework/request';
import './home.css'
class Home extends Component {
  static async asyncData(context, route) {
    const res = await request.get('/api/blog/list', context);
    return res.data || {};
  }

  async componentDidMount() {
    // 初始化用户信息
    await request.webGet('/api/init/userinfo');
    // 查询 cookie 里是否获取到用户信息
    const cookieData = cookie.get();
    if (cookieData.USER_INFO) {
      console.log('user info:', JSON.parse(decodeURIComponent(cookieData.USER_INFO)));
    }
  }

  render() {
    const { list = [] } = this.props;
    return <div className="easy-article-list">
      <ul>
        {list.map(function (item) {
          return <li key={item.id} className="easy-article-item">
            <h2 className="easy-article-title"><Link to={'/detail/' + item.id}>{item.title}</Link></h2>
            <div className="easy-article-summary">{item.summary}</div>
            <div className="easy-article-meta">
              <span>11Word Count:{item.wordCount}  </span>
              <span>Create Time: {item.createTime}</span>
            </div>
          </li>;
        })}
      </ul>
    </div>;
  }
}


const mapStateToProps = state => {
  return {
    list: state.list
  };
};


const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(EASY_ENV_IS_DEV ? hot(Home) : Home);
