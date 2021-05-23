import React from 'react'
import { navigate } from 'gatsby-link'

import './contact.css'

function encode(data) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

export default function Contact() {
  const [state, setState] = React.useState({})

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.getAttribute('name'),
        ...state,
      }),
    })
      .then(() => navigate(form.getAttribute('action')))
      .catch((error) => alert(error))
  }

  return (
    <div>
      <h1>Contact</h1>
      <form
        className="Form"
        name="contact"
        method="post"
        action="/"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        onSubmit={handleSubmit}
      >
        {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
        <input type="hidden" name="form-name" value="contact" />
        <p hidden>
          <label>
            Don’t fill this out: <input name="bot-field" onChange={handleChange} />
          </label>
        </p>
        <div className="Form--Group">
        <label className="Form--Label">
              <input
                className="Form--Input Form--InputText"
                type="text"
                placeholder="Name"
                name="name"
                onChange={handleChange}
                required
              />
              <span>Your name:</span>
        </label>
        <br />
        <label className="Form--Label">
            <input
              className="Form--Input Form--InputText"
              type="email"
              placeholder="Email"
              name="emailAddress"
              onChange={handleChange}
              required
            />
            <span>Your email:</span>
          </label>
          <br />
        <label className="Form--Label has-arrow">
            <select
              className="Form--Input Form--Select"
              name="type"
              defaultValue="Type of Enquiry"
              onChange={handleChange}
              required
            >
              <option disabled hidden>
                Type of Enquiry
              </option>
              <option>Want to know more</option>
              <option>Want to book a photoshoot</option>
              <option>Other Enquiry</option>
            </select>
          </label>
          <br />
        <label className="Form--Label">
            <textarea
              className="Form--Input Form--Textarea Form--InputText"
              placeholder="Message"
              name="message"
              rows="10"
              onChange={handleChange}
              required
            />
            <span>Message:</span>
          </label>
          <br />
          <button className={'Button Form--SubmitButton'} type="submit">Send</button>
        </div>
      </form>
    </div>
  )
}