<input className={profiles.tag} onChange={(e) => {this.setState({[profiles.tag]:e.target.value})}}/>
<button onClick={(e) => this.addPost(profiles.tag, this.state[profiles.tag])}>Post that SHI</button>
