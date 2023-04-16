import logging
import os
from queue import Queue
from threading import Thread
from time import time


logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')

logger = logging.getLogger(__name__)


class DownloadWorker(Thread):

    def __init__(self, queue):
        Thread.__init__(self)
        self.queue = queue

    def run(self, request_fn):
        while True:
            link = self.queue.get()
            try:
                request_fn(link)
            finally:
                self.queue.task_done()