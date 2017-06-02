import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './LoginPanel.less';

class LoginPanel extends Component {
  componentDidMount () {
    const fabric = window.fabric;
    if (!fabric) {
      return;
    }
    const canvas = new fabric.Canvas('canvas');
    if (!canvas) {
      return;
    }
    fabric.Object.prototype.transparentCorners = false;

    canvas.selection = false; // disable group selection

    fabric.Image.fromURL('../resources/icons/sky.png', (oImg) => {
      oImg.set('selectable', false); // make object unselectable
      canvas.add(oImg);
    });

    fabric.Image.fromURL('../resources/icons/cloud.png', (oImg2) => {
      oImg2.set('selectable', false); // make object unselectable
      oImg2.set({ height: 100, top: 40 });
      canvas.add(oImg2);
      animateCloud(oImg2);
    });

    fabric.Image.fromURL('../resources/icons/zbcg_building.png', (oImg) => {
      oImg.set('selectable', false); // make object unselectable
      canvas.add(oImg);
    });


    function animateCloud (oImg) {
      const duration = 60000;
      console.log(oImg.getWidth());
      const width = oImg.getWidth();
      function animateLeft () {
        oImg.animate('left', -width / 2, {
          duration,
          onChange: canvas.renderAll.bind(canvas),
          easing: (t, b, c, d) => ((c * t) / d) + b,
          onComplete: () => {
            oImg.set({ left: 0 }).setCoords();
            animateLeft();
          }
        });
      }
      animateLeft();
    }
  }
  render () {
    const children = this.props.children;
    return (
      <div className={styles.panel}>
        <canvas id="canvas" width="431px" height="183px" />
        {children}
      </div>
    );
  }
}

LoginPanel.propTypes = {
  children: PropTypes.node.isRequired
};


export default LoginPanel;
