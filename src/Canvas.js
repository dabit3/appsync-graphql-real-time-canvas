import React, { Component } from "react";

import CanvasDraw from "./RCD";
import uuid from 'uuid/v4'

import { API, graphqlOperation } from 'aws-amplify'
import { onUpdateCanvas } from './graphql/subscriptions'
import { updateCanvas, createCanvas } from './graphql/mutations'

class Demo extends Component {
  state = {
    brushColor: "#000",
    canvasHeight: 400,
    canvasWidth: 400,
    brushRadius: 8,
    lazyRadius: 8
  };
  lineLength = 0
  id = '123'
  clientId = uuid()
  canvasInfo = 'tempcanvas'
  componentDidMount() {
    this.setState({
      brushColor: "#" + Math.floor(Math.random() * 16777215).toString(16)
    })
    window.addEventListener('mouseup', () => {
      this.setState({
        brushColor: "#" + Math.floor(Math.random() * 16777215).toString(16)
      })
      const data = this.canvas.getSaveData()
      const p = JSON.parse(data)
      const length = p.lines.length
      this.lineLength = length

      const canvas = {
        id: this.id,
        clientId: this.clientId,
        data
      }
       API.graphql(graphqlOperation(updateCanvas, { input: canvas }))
        .then(c => {
          console.log('canvas updated!')
        })
        .catch(err => console.log('error creating: ', err))
    })
    API.graphql(graphqlOperation(onUpdateCanvas))
      .subscribe({
        next: (d) => {
          const data = JSON.parse(d.value.data.onUpdateCanvas.data)
          const length = data.lines.length
          if (length === 0) {
            const data = this.canvas.getSaveData()
            const parsedData = JSON.parse(data)
            const newData = {
              ...parsedData,
              lines: []
            }
            const newCanvas = JSON.stringify(newData)
            console.log('newCanvas:', newCanvas)
            this.canvas.loadSaveData(newCanvas)
          }
          if (this.lineLength === length || length === Number(0)) return
          console.log('lineLength: ', this.lineLength)
          console.log('length: ', length)
          const last = data.lines[length -1]
          this.canvas.simulateDrawingLines({ lines: [last] })
        }
      })
  }
  clear = () => {
    const data = this.canvas.getSaveData()
    const parsedData = JSON.parse(data)
    const newData = {
      ...parsedData,
      lines: []
    }
    const newCanvas = JSON.stringify(newData)
    this.canvas.loadSaveData(newCanvas)
    const canvas = {
      id: this.id,
      clientId: this.clientId,
      data: newCanvas
    }
    API.graphql(graphqlOperation(updateCanvas, { input: canvas }))
        .then(c => {
          console.log('canvas updated!')
        })
        .catch(err => console.log('error creating: ', err))
  }
  render() {
    return (
      <div>
        <button onClick={this.clear}>Clear</button>
        <CanvasDraw
          {...this.state}
          ref={canvas => this.canvas = canvas}
        />
      </div>
    );
  }
}

export default Demo