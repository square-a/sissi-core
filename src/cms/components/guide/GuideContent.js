/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';

const GuideContent = () => ([
  <div key='guide-intro' className='guide__intro' id='guide-top'>
    <h1>Hi, I'm sissi.</h1>
    <h2>I am the creator of this tool – and here to help you. I can offer my advice on all these topics:</h2>
  </div>
  ,
  <div key='guide-content' className='guide__content'>
    <ul className='guide__main-list'>
      <li className='guide__main-list__item'><a href='#general-usage'>General Usage</a></li>
      <li>
        <ul>
          <li><a href='#general-navigate'>How to navigate through the website manager?</a></li>
          <li><a href='#general-add'>How to add pages and sections?</a></li>
          <li><a href='#general-delete'>How to delete pages and sections?</a></li>
          <li><a href='#general-reorder'>How to reorder pages and sections?</a></li>
        </ul>
      </li>
      <li className='guide__main-list__item'><a href='#editor'>Editor</a></li>
      <li>
        <ul>
          <li><a href='#editor-markdown'>Why are there weird characters in my content?</a></li>
          <li><a href='#editor-paragraph'>How to add a paragraph?</a></li>
          <li><a href='#editor-headings'>How to add different headings?</a></li>
          <li><a href='#editor-italic'>How to make text appear italic?</a></li>
          <li><a href='#editor-list'>How to add a list?</a></li>
          <li><a href='#editor-link'>How to enter a link?</a></li>
          <li><a href='#editor-image'>How to add an image?</a></li>
        </ul>
      </li>
    </ul>
    <h3 id='general-usage'>General Use <a className='guide__to-top' href='#guide-top'>▲</a></h3>
    <p>This website manager is what’s generally called a content management system – short CMS. As such it helps you to edit, add and remove the contents of your website.</p>
    <p>The CMS needs to be connected to your website and configured by a developer (and, since you’re here, they’ve obviously done this) so there are certain things only they can help you with. But I can guide you through the general usage of this tool.</p>
    <h4 id='general-navigate'>How to navigate through the website manager? <a className='guide__to-top' href='#guide-top'>▲</a></h4>
    <p>The first thing you see when you open the website manager is the index page. Here you can edit the global data of your website. If you ever want to get back here just from elswhere in the editor just close the page you are currently on.</p>
    <p>You can open and close pages by clicking on them in the nav bar – click once: open the page, click again: close the page. The same goes for sections within the pages. Remember, though: When you close a section or page without saving first your changes will be lost!</p>
    <h4 id='general-add'>How to add pages and sections? <a className='guide__to-top' href='#guide-top'>▲</a></h4>
    <p>To add just click the <code>ADD</code> button in the corresponding nav bar – if the <code>ADD</code> button disappears you have reached the maximum page or section limit set by your developer.</p>
    <h4 id='general-delete'>How to delete pages and sections? <a className='guide__to-top' href='#guide-top'>▲</a></h4>
    <p>To delete open the page or section you want to remove and click the <code>DELETE</code> button. Keep in mind that deleting a page will also remove all the sections within!</p>
    <p>If the <code>DELETE</code> button disappears you have reached the minimum page or section limit set by your developer. Note that some pages and sections (such as a contact form) might also be protected from deletion by your developer.</p>
    <h4 id='general-reorder'>How to reorder pages and sections? <a className='guide__to-top' href='#guide-top'>▲</a></h4>
    <p>Simple! Just drag and drop them in the nav bar. When you move a page, all its sections will move with it.</p>
    <h3 id='editor'>Editor <a className='guide__to-top' href='#guide-top'>▲</a></h3>
    <p>The editor is where most of the magic happens. Here you can add and edit your content – text, images, links, you name it. If you only have text to add this is easy: just start typing! If you want to format your text and add other content things get a bit more exciting.</p>
    <p>There are two main ways to use the editor: either by writing <a href='#editor-markdown'>markdown syntax</a> or by clicking on the desired format in the toolbar which will enter the required markdown characters for you.</p>
    <h4 id='editor-markdown'>Why are there weird characters in my content? <a className='guide__to-top' href='#guide-top'>▲</a></h4>
    <p>The editor uses markdown. This is a syntax that helps us translate your content for web browsers, so that it can be viewed on your website. So please don’t worry about all the weird <code>##</code>s and <code>[]</code>s and <code>__</code>s – they are very important to make all this work but will all be removed and never appear on your website!</p>
    <p>If they DO appear on your website you probably used some markdown characters in your text which can mess things up. For example, if you're linking to a phone number using brackets, like this: <code>[+46(0)123](tel:+46(0)123)</code> the editor will think you're closing the link already after the first <code>)</code>. To solve this just avoid the brackets and use non-markdown characters like <code>-</code> instead. This is working fine: <code>[+46(0)123](tel:+46-0-123)</code>.</p>
    <h4 id='editor-paragraph'>How to add a paragraph? <a className='guide__to-top' href='#guide-top'>▲</a></h4>
    <p>You can just click in the editor and start writing – this will produce regular text. If you want to start a new paragraph just hit enter twice, to leave an empty line in between.</p>
    <blockquote>
      <p>This is one paragraph. It can be short but it can also be long and wrap several lines – that’s no problem, your website will handle that for you! Just keep on writing. Or…</p>
      <p>Enter an empty line to start a new paragraph.</p>
    </blockquote>
    <h4 id='editor-headings'>How to add different headings? <a className='guide__to-top' href='#guide-top'>▲</a></h4>
    <p>You can add headings by entering <code>#</code> on the beginning of a line. To change the level of the heading just enter another <code>#</code> (or click on the <code>H</code> button in the toolbar several times).</p>
    <p>In general <code>#</code> is the highest possible level while <code>######</code> is the lowest. For details on which levels you are supposed to use and how they will be formatted please consult your developer.</p>
    <blockquote>
      <h3># This is a heading</h3>
      <h4>## This could be a subheading</h4>
    </blockquote>
    <h4 id='editor-italic'>How to make text appear italic? <a className='guide__to-top' href='#guide-top'>▲</a></h4>
    <p>To make text appear italic you need to wrap it in underscores, one at the beginning of the italic text, one at the end. Make sure to write everything you do NOT want to be italic after the second underscore.</p>
    <blockquote>
      <p>This is a text with <em>_some italic words_</em> in the middle.</p>
    </blockquote>
    <h4 id='editor-list'>How to add a list? <a className='guide__to-top' href='#guide-top'>▲</a></h4>
    <p>To make a list you need to move your cursor on a new line, then add a <code>*</code> and a <code>blank space</code> before you start writing your first list entry. To add another entry just repeat the process. When your list is done you need to enter an <code>empty line</code> below – this is really important to make the editor understand that the following content is not part of the list.</p>
    <blockquote>
      <ul>
        <li>* this</li>
        <li>* is</li>
        <li>* a</li>
        <li>* list</li>
      </ul>
      <p>And here is the next part of the content – not a part of the list.</p>
    </blockquote>
    <h4 id='editor-link'>How to enter a link? <a className='guide__to-top' href='#guide-top'>▲</a></h4>
    <p>A link is written in the following way: <code>[the link text](the link url, e.g. https://google.com)</code>. If you want to link to another place on your own website you simply use the path you want to link to as url, e.g. <code>/contact</code>. You can place links anywhere in your text, no need to start a new line.</p>
    <blockquote>
      <p>This will [look like](https://a-square.eu) that:</p>
      <p>This will <a href='https://a-square.eu'>look like</a> that:</p>
    </blockquote>
    <h4 id='editor-image'>How to enter an image? <a className='guide__to-top' href='#guide-top'>▲</a></h4>
    <p>Now, images are something very special. In markdown they are entered almost like links: <code>![image description](image url, e.g. /images/example.jpeg)</code>. With the difference that the image description will not be displayed in your content – but screen readers will read it to blind people so they can understand what they’re supposed to be seeing. And don’t forget the <code>!</code> before the whole thing!</p>
    <p>However, you will probably want to upload your own images or choose one of the images you have already uploaded earlier. And you can do this by clicking on the image button in the toolbar. Once you have chosen your image it is important to <code>COPY</code> the line that you are given and paste it into your content, wherever you want to place your image. You can then add the image description.</p>
    <p>Unfortunately we have no way of showing you the image in the editor right now. But trust us, on your website it will look awesome!</p>
    <blockquote>
      <p>![path in a forest](/images/guide-image.jpg)</p>
      <p>...magically turns into...</p>
      <img alt='path in a forest' src='/guide-image.jpg' />
    </blockquote>
    <footer className='guide__footer'>
      <p>I hope I've been helpful!</p>
      <p>If you'd like to know more about me you can find me on <a href='https://github.com/square-a/sissi'>Github</a> or visit my parents at <a href='https://a-square.eu'>A Square</a>.</p>
    </footer>
  </div>
]);

export default GuideContent;
