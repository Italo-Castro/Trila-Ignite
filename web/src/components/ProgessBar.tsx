interface ProgresBarProps {
    progress: number
}

export function ProgressBar(props: ProgresBarProps) {

    return (
        <div
            role="progresbar"
            aria-label="Progressos de habpitos completados neste dia"
            aria-valuenow={75}
            className="h-3 rounded-xl bg-violet-600"
            style={{
                width: `${props.progress}%`
            }} />
    )
}