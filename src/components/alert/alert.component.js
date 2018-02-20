import { h, render, Component } from "preact"
import styles from "./alert.component.less"
import { appendComponent, removeComponent } from "../../services/popups.service"
import { BackgroundComponent } from "../background/background.component"
import { AnimationComponent } from "../animation/animation.component"

export class AlertComponent extends Component {
	constructor() {
		super()
		this.state = { doAnimation: true }
	}

	ok = () => {
		this.props.ok()
		this.setState({ doAnimation: false })
	}

	cancel = () => {
		this.props.cancel()
		this.setState({ doAnimation: false })
	}

	render() {
		return (
			<div class={styles.host}>
				<BackgroundComponent onClick={() => this.cancel()} />
				<AnimationComponent animate={this.state.doAnimation}>
					<article>
						{ this.props.message && <p>{this.props.message}</p> }
						<div class={styles.container}>
							<button
								onClick={() => this.ok()}>
								Ok
							</button>
							<button
								onClick={() => this.cancel()}>
								Cancel
							</button>
						</div>
					</article>
				</AnimationComponent>
			</div>
		)
	}
}

export function renderAlertComponent(message) {
	return new Promise((resolve, reject) => {
		appendComponent(
			<AlertComponent
				ok={() => resolve()}
				cancel={() => reject()}
				message={message} />
		)
	})
		.then(data => {
			removeComponent()
			return data
		})
		.catch(error => {
			removeComponent()
			throw error
		})
}