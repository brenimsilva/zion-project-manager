from termcolor import colored
import sys
class CustomMessage:
    def __init__(self) -> None:
        teste = 1

    def c_log(self, message: str):
        print(colored(message, "white", "on_light_red"))