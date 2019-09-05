import React, { Component } from 'react';
import Head from 'next/head';
import stylesheet from 'styles/main.scss';

import { Header, Main, Footer } from '../components';
// import Main from '../components/Main';
// import Footer from '../components/Footer';
// import db from '../db';
// import DbConnect from '../components/DbConnect';

class IndexPage extends Component {
  state = {
    isArticleVisible: false,
    timeout: false,
    articleTimeout: false,
    article: '',
    loading: 'is-loading'
  };

  componentDidMount() {
    this.timeoutId = setTimeout(() => {
      this.setState({ loading: '' });
    }, 100);
  }

  componentWillUnmount() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  handleOpenArticle = article => {
    this.setState({
      isArticleVisible: !this.state.isArticleVisible,
      article
    });

    setTimeout(() => {
      this.setState({
        timeout: !this.state.timeout
      });
    }, 325);

    setTimeout(() => {
      this.setState({
        articleTimeout: !this.state.articleTimeout
      });
    }, 350);
  };

  handleCloseArticle = () => {
    this.setState({
      articleTimeout: !this.state.articleTimeout
    });

    setTimeout(() => {
      this.setState({
        timeout: !this.state.timeout
      });
    }, 325);

    setTimeout(() => {
      this.setState({
        isArticleVisible: !this.state.isArticleVisible,
        article: ''
      });
    }, 350);
  };
  render() {
    return (
      <div
        className={`body ${this.state.loading} ${
          this.state.isArticleVisible ? 'is-article-visible' : ''
        }`}
      >
        <div>
          <Head>
            <title>Next.js Starter</title>
            <link
              href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,300i,600,600i"
              rel="stylesheet"
            />
          </Head>

          <style dangerouslySetInnerHTML={{ __html: stylesheet }} />

          <div id="wrapper">
            <Header
              onOpenArticle={this.handleOpenArticle}
              timeout={this.state.timeout}
            />
            <Main
              isArticleVisible={this.state.isArticleVisible}
              timeout={this.state.timeout}
              articleTimeout={this.state.articleTimeout}
              article={this.state.article}
              onCloseArticle={this.handleCloseArticle}
            />
            <Footer timeout={this.state.timeout} />
          </div>

          <div id="bg" />
        </div>
      </div>
    );
  }
}

export default IndexPage;
